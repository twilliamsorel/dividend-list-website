import { postRequest, getBaseUrl, convertSlug } from './utils.js'
import { filterDefaults } from './filters.js'

export default class Table {
  constructor() {
    this.sort = JSON.parse(sessionStorage.getItem('sort')) || ['dividend_yield', 'desc']
    this.table = document.querySelector('table.stocks')
    this.filters = JSON.parse(sessionStorage.getItem('filters')) || filterDefaults
    this.page = 0
    this.savedStocks = JSON.parse(localStorage.getItem('stocks')) || null
    this.baseUrl = getBaseUrl()
    this.freezeScroll = false
    this.isSavedTable = this.table && this.table.getAttribute('data-source')
  }

  header() {
    return `
      <tr class="label">
        <td data-sort="ticker" data-tooltip="<span>ticker</span>The stock's ticker value; a shorthand code used to identify the stock." class="${this.sort[0] === 'ticker' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}">ticker</td>
        <td class="d-none d-lg-table-cell ${this.sort[0] === 'dividend_records' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}" data-sort="dividend_records"
          data-tooltip="<span>dividend records</span>The total number of historical dividend records in the database for this stock, taken at monthly intervals.">dividend records</td>
        <td data-sort="dividend_volatility" class="d-none d-md-table-cell ${this.sort[0] === 'dividend_volatility' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}"
          data-tooltip="<span>dividend volatility</span>A numeric value representing the volatility of monthly dividend payments. Compare this value to the dividend yield charts to calibrate to it.">
          <span class="d-inline-block d-xl-none">div volatility</span>
          <span class="d-none d-xl-inline-block">dividend volatility</span>
        </td>
        <td data-sort="percentage_yield" class="${this.sort[0] === 'percentage_yield' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}"
          data-tooltip="<span>annual percentage yield</span>The annual percentage yield, calculated by dividing the sum of dividend payments by the current stock price. See 'Guides > Glossary and methodology' for more information.">
          <span class="d-inline-block d-xl-none">APY</span>
          <span class="d-none d-xl-inline-block">annual percentage yield</span>
        </td>
        <td data-sort="median_percentage_yield" class="${this.sort[0] === 'median_percentage_yield' ? 'active' : ''} ${this.sort[1] === 'desc' ? 'desc' : 'asc'}"
          data-tooltip="<span>Median APY</span>A median variation of the APY, designed to be more representative of typical returns. See 'Guides > Glossary and methodology' for more information.">Median APY</td>
      </tr>
    `
  }

  body(d) {
    return `
      <tr>
        <td>
          <a href="/stocks/${d.ticker.toLowerCase()}">${d.ticker}</a>
          <span class="subtitle d-none d-sm-block">${d.company}</span>
        </td>
        <td class="d-none d-lg-table-cell">${d.dividend_records} <span class="subtitle year">| ${Math.round((d.dividend_records / parseFloat(d.frequency)) * 10) / 10} years</span></td>
        <td class="d-none d-md-table-cell">${d.dividend_volatility.toFixed(2)}</td>
        <td>${d.percentage_yield.toFixed(2)} %</td>
        <td>${d.median_percentage_yield.toFixed(2)} %</td>
      </tr>
    `
  }

  initializeTable() {
    if (!this.table) return

    this.updateTable()

    if (!this.isSavedTable) {
      window.addEventListener('scroll', (e) => {
        if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight - 300) {
          !this.freezeScroll && this.paginate()
          this.freezeScroll = true
        }
      })
    }

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
      pagination: this.page,
      stocks: this.isSavedTable && JSON.parse(localStorage.getItem('stocks'))
    }

    const savedData = requestObj.stocks ? JSON.parse(await postRequest(`${this.baseUrl}/api/get-saved`, requestObj)) : (this.isSavedTable && 'no saved data')
    const data = savedData || passedData || JSON.parse(await postRequest(`${this.baseUrl}/api/get-stocks`, requestObj))

    if (data.length === 0) return

    (data !== 'no saved data') && data.forEach((d) => {
      this.table.querySelector('tbody.information').insertAdjacentHTML('beforeend', this.body(d))
    })

    this.page++
    this.freezeScroll = false
  }

  setSort(sort) {
    const currentSort = JSON.parse(sessionStorage.getItem('sort'))
    const direction = currentSort && currentSort[1] === 'desc' ? 'asc' : 'desc'
    const temp = [sort, direction]
    this.sort = temp
    sessionStorage.setItem('sort', JSON.stringify(temp))
    this.updateTable()
  }

  setFilter(detail) {
    const [filter, boundary] = convertSlug(detail.filter)
    let value;

    if (boundary) {
      if (!detail.value) value = filterDefaults[filter][boundary]
      value = parseFloat(detail.value)
    } else {
      value = detail.value
    }

    if (boundary) {
      this.filters[filter][boundary] = value
    } else {
      this.filters[filter] = value
    }

    sessionStorage.setItem('filters', JSON.stringify(this.filters))
    this.updateTable()
  }
}