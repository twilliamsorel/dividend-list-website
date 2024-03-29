export default class Filters {
    constructor(selectorString) {
        this.form = document.querySelector(selectorString)
        this.button = document.querySelector('#filter-toggle')
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.#updateFiltersCount()
            const rawData = new FormData(this.form)
            const formattedData = this.#formatFiltersData(rawData)
            const filterEvent = new CustomEvent('filter', { detail: { results: formattedData } })
            window.dispatchEvent(filterEvent)
        })
        this.button.addEventListener('click', () => {
            this.form.parentElement.classList.toggle('open')
        })
    }

    #countFilters() {
        const inputs = Array.from(this.form.querySelectorAll('input')).filter((input) => input.type != 'submit')
        const selects = Array.from(this.form.querySelectorAll('select'))
        const inputCount = inputs.reduce((acc, input) => acc + (input.value.length > 0 ? 1 : 0), 0)
        const selectsCount = selects.map((select) => !select.value.match(/^$|ALL/) ? 1 : 0).reduce((acc, c) => acc + c, 0)
        return inputCount + selectsCount
    }

    #updateFiltersCount() {
        this.button.querySelector('#filter-counter').innerHTML = this.#countFilters() > 0 ? `(${this.#countFilters()})` : ''
    }

    #formatFiltersData(formData) {
        const data = Array.from(formData.entries())
        const modifiedData = data.map((item) => {
            if (item[1].length < 1) {
                if (item[0].includes('min')) {
                return [item[0], '0']
                } else if (item[0].includes('max')) {
                return [item[0], '99999999999']
                }
            } else {
                return [item[0], item[1]]
            }
        })
        // COLLAPSE REPEAT DATA INTO SINGLE ARRAYS
        return modifiedData.reduce((acc, data) => { 
            if (acc[data[0]]) {
                if (!Array.isArray(acc[data[0]])) {
                acc[data[0]] = [acc[data[0]]]
                }
                acc[data[0]].push(data[1])
            } else {
                acc[data[0]] = data[1]
            }
            return acc
        }, {})
    }
}