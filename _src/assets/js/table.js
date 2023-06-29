import { postRequest } from './utils.js'
import { filterDefaults } from './filters.js'

export default class Table {
  constructor() {
    this.sort = JSON.parse(localStorage.getItem('sort')) || ['dividend_yield', 'desc']
    this.table = document.querySelector('table.stocks')
    this.filters = JSON.parse(localStorage.getItem('filters')) || filterDefaults
    this.page = 0
    this.savedStocks = JSON.parse(localStorage.getItem('stocks')) || null
  }

  header() {
    return `
      <tr class="label">
        <td data-sort="ticker" class="${this.sort[0] === 'ticker' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}">ticker</td>
        <td class="d-none d-lg-table-cell ${this.sort[0] === 'history_size' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}" data-sort="history_size">recorded payouts</td>
        <td data-sort="dividend_volatility" class="d-none d-md-table-cell ${this.sort[0] === 'dividend_volatility' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}">
          <span class="d-inline-block d-lg-none">div volatility</span>
          <span class="d-none d-lg-inline-block">dividend volatility</span>
        </td>
        <td data-sort="percentage_yield" class="${this.sort[0] === 'percentage_yield' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}">
          <span class="d-inline-block d-xl-none">APY</span>
          <span class="d-none d-xl-inline-block">annual percentage yield</span>
        </td>
        <td data-sort="median_percentage_yield" class="${this.sort[0] === 'median_percentage_yield' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}">Median APY</td>
      </tr>
    `
  }

  body(d) {
    return `
      <tr>
        <td><a href="/stocks/${d.ticker}">${d.ticker}</a></td>
        <td class="d-none d-lg-table-cell">${d.history_size}</td>
        <td class="d-none d-md-table-cell">${d.dividend_volatility.toFixed(2)}</td>
        <td>${d.percentage_yield.toFixed(2)} %</td>
        <td>${d.median_percentage_yield.toFixed(2)} %</td>
      </tr>
    `
  }

  initializeTable() {
    if (!this.table) return

    this.updateTable()

    window.addEventListener('scroll', (e) => {
      if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight) {
        this.paginate()
      }
    })

    this.table.querySelector('thead').addEventListener('click', (e) => {
      this.setSort(e.target.getAttribute('data-sort'))
    })

    window.addEventListener('search', (e) => {
      this.updateTable(e.detail.results)
    })

    window.addEventListener('filter', (e) => {
      this.setFilter(e.detail)
    })
  }

  updateTable(data = false) {
    this.resetTable()
    const thead = this.header(this.sort)
    this.table.querySelector('thead').insertAdjacentHTML('beforeend', thead)

    this.paginate(data)
  }

  resetTable() {
    const rows = this.table.querySelectorAll('tr')
    this.page = 0

    rows.forEach((row) => {
      row.remove()
    })
  }

  async paginate(passedData) {
    const requestObj = {
      filters: this.filters,
      sort: this.sort,
      pagination: this.page
    }

    const isSavedTable = this.table.getAttribute('data-source')
    const savedStocks = isSavedTable && JSON.parse(localStorage.getItem('stocks'))
    const savedData = savedStocks ? JSON.parse(await postRequest('http://localhost:5000/api/get-saved', savedStocks)) : (isSavedTable && 'no saved data')
    const data = savedData || passedData || JSON.parse(await postRequest('http://localhost:5000/api/get-stocks', requestObj))

    console.log(await data)

    if (data.length === 0) return

    (data !== 'no saved data') && data.forEach((d) => {
      this.table.querySelector('tbody.information').insertAdjacentHTML('beforeend', this.body(d))
    })

    this.page++
  }

  setSort(sort) {
    const currentSort = JSON.parse(localStorage.getItem('sort'))
    const direction = currentSort && currentSort[1] === 'desc' ? 'asc' : 'desc'
    const temp = [sort, direction]
    this.sort = temp
    localStorage.setItem('sort', JSON.stringify(temp))
    this.updateTable()
  }

  setFilter(detail) {
    const temp = detail.filter.split('-')
    const filter = temp.length > 2 ? temp[0] + temp[1].charAt(0).toUpperCase() + temp[1].slice(1) : temp[0]
    const boundary = temp.length > 2 ? temp[2] : temp[1]
    const value = detail.value ? parseFloat(detail.value) : filterDefaults[filter][boundary]

    this.filters[filter][boundary] = value
    localStorage.setItem('filters', JSON.stringify(this.filters))
    this.updateTable()
  }
}