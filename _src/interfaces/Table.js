import Utils from '/interfaces/utils.js'

export default class Table {
    constructor(selectorString) {
        this.table = document.querySelector(selectorString)
        this.sort = 'ticker'
        this.sortDirection = 'desc'
        this.filters = undefined
        this.page = 0
        this.freezeScroll = false
        this.#updateTable()
        this.searchLengthRef = 0
        window.addEventListener('scroll', () => {
            if (this.searchLengthRef > 0) return;
            if (window.scrollY + window.innerHeight + 1 >= document.body.clientHeight - 300) {
                !this.freezeScroll && this.#paginate()
                this.freezeScroll = true
            }
        })
        this.table.querySelector('thead').addEventListener('click', (e) => {
            this.#setSort(e.target.getAttribute('data-sort'))
        })
        window.addEventListener('search', (e) => {
            this.#updateTable(e.detail.results)
            this.searchLengthRef = e.detail.length
        })
        window.addEventListener('filter', (e) => {
            const data = e.detail.results
            this.filters = data
            this.#updateTable()
        })
    }

    #header() {
        return `
            <tr class="label">
                <td data-sort="ticker" data-tooltip="<span>ticker</span>The stock's ticker value; a shorthand code used to identify the stock." class="${this.sort === 'ticker' ? 'active' : ''} ${this.sortDirection === 'desc' ? 'desc' : 'asc'}">ticker</td>
                <td class="d-none d-lg-table-cell ${this.sort === 'dividend_records' ? 'active' : ''} ${this.sortDirection === 'desc' ? 'desc' : 'asc'}" data-sort="dividend_records"
                data-tooltip="<span>dividend records</span>The total number of historical dividend records in the database for this stock, taken at monthly intervals.">dividend records</td>
                <td data-sort="dividend_volatility" class="d-none d-md-table-cell ${this.sort === 'dividend_volatility' ? 'active' : ''} ${this.sortDirection === 'desc' ? 'desc' : 'asc'}"
                data-tooltip="<span>dividend volatility</span>A numeric value representing the volatility of monthly dividend payments. Compare this value to the dividend yield charts to calibrate to it.">
                    <span class="d-inline-block d-xl-none">div volatility</span>
                    <span class="d-none d-xl-inline-block">dividend volatility</span>
                </td>
                <td data-sort="percentage_yield" class="${this.sort === 'percentage_yield' ? 'active' : ''} ${this.sortDirection === 'desc' ? 'desc' : 'asc'}"
                data-tooltip="<span>annual percentage yield</span>The annual percentage yield, calculated by dividing the sum of dividend payments by the current stock price. See 'Guides > Glossary and methodology' for more information.">
                    <span class="d-inline-block d-xl-none">APY</span>
                    <span class="d-none d-xl-inline-block">annual percentage yield</span>
                </td>
                <td data-sort="median_percentage_yield" class="${this.sort === 'median_percentage_yield' ? 'active' : ''} ${this.sortDirection === 'desc' ? 'desc' : 'asc'}"
                data-tooltip="<span>Median APY</span>A median variation of the APY, designed to be more representative of typical returns. See 'Guides > Glossary and methodology' for more information.">Median APY</td>
            </tr>
        `
    }

    #row(d) {
        return `
        <tr>
            <td>
                <a href="/stocks/${d.ticker.toLowerCase().replace('.', '-')}">${d.ticker}</a>
                <span class="subtitle d-none d-sm-block">${d.company}</span>
            </td>
            <td class="d-none d-lg-table-cell">${d.dividend_records} <span class="subtitle year">| ${Math.round((d.dividend_records / parseFloat(d.frequency)) * 10) / 10} years</span></td>
            <td class="d-none d-md-table-cell">${d.dividend_volatility.toFixed(2)}</td>
            <td>${d.percentage_yield.toFixed(2)} %</td>
            <td>${d.median_percentage_yield.toFixed(2)} %</td>
        </tr>
        `
    }

    #clearTable() {
        if (!this.table) throw Error('Table is not defined. Did you try and call this before initializing one?')
        const rows = this.table.querySelectorAll('tr')
        this.page = 0
        rows.forEach((row) => {
            row.remove()
        })
    }

    #updateTable(data = false) {
        this.#clearTable()
        const thead = this.#header()
        this.table.querySelector('thead').insertAdjacentHTML('beforeend', thead)
        this.#paginate(data)
    }

    async #paginate(passedData) {
        const requestObj = {
            sort: this.sort,
            sortDirection: this.sortDirection,
            pagination: this.page,
        }
        if (this.filters) { requestObj.filters = this.filters }
        const data = passedData || JSON.parse(await Utils.postRequest(`${Utils.getBaseUrl()}/api/get-stocks`, requestObj))
        if (data.length === 0) return;
        data.forEach((d) => {
            if (!d.percentage_yield) return;
            this.table.querySelector('tbody').insertAdjacentHTML('beforeend', this.#row(d))
        })
        this.page++
        this.freezeScroll = false
    }

    #setSort(sort) {
        this.sort = sort
        this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
        this.#updateTable()
    }
}