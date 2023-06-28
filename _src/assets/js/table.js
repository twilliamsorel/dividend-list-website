import { getRequest } from './utils.js'

export default class Table {
  constructor() {
    this.filter = JSON.parse(localStorage.getItem('filter')) || ['dividend_yield', 'desc']
    this.table = document.querySelector('table.stocks')
    this.page = 0
  }

  header() {
    return `
      <tr class="label">
        <td data-filter="ticker" class="${this.filter[0] === 'ticker' ? 'active' : ''} ${this.filter[1] === 'desc' ? 'desc' : 'asc'}">ticker</td>
        <td class="d-none d-lg-table-cell ${this.filter[0] === 'history_size' ? 'active' : ''} ${this.filter[1] === 'desc' ? 'desc' : 'asc'}" data-filter="history_size">recorded payouts</td>
        <td data-filter="dividend_volatility" class="d-none d-md-table-cell ${this.filter[0] === 'dividend_volatility' ? 'active' : ''} ${this.filter[1] === 'desc' ? 'desc' : 'asc'}">
          <span class="d-inline-block d-lg-none">div volatility</span>
          <span class="d-none d-lg-inline-block">dividend volatility</span>
        </td>
        <td data-filter="percentage_yield" class="${this.filter[0] === 'percentage_yield' ? 'active' : ''} ${this.filter[1] === 'desc' ? 'desc' : 'asc'}">
          <span class="d-inline-block d-xl-none">APY</span>
          <span class="d-none d-xl-inline-block">annual percentage yield</span>
        </td>
        <td data-filter="median_percentage_yield" class="${this.filter[0] === 'median_percentage_yield' ? 'active' : ''} ${this.filter[1] === 'desc' ? 'desc' : 'asc'}">Median APY</td>
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
      this.setFilter(e.target.getAttribute('data-filter'))
      this.updateTable()
    })

    window.addEventListener('search', (e) => {
      this.updateTable(e.detail.results)
    })
  }

  updateTable(data = false) {
    this.resetTable()
    const thead = this.header(this.filter)
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
    const data = passedData ? passedData : JSON.parse(await getRequest(`http://localhost:5000/api/get-stocks?pagination=${this.page}&filter=${this.filter[0]}&direction=${this.filter[1]}`))
    if (data.length === 0) return

    data.forEach((d) => {
      this.table.querySelector('tbody.information').insertAdjacentHTML('beforeend', this.body(d))
    })

    this.page++
  }

  setFilter(filter) {
    const currentFilter = JSON.parse(localStorage.getItem('filter'))
    const direction = currentFilter[1] === 'desc' ? 'asc' : 'desc'
    const temp = currentFilter[0] === filter ? [filter, direction] : [filter, 'desc']
    this.filter = temp
    localStorage.setItem('filter', JSON.stringify(temp))
  }
}