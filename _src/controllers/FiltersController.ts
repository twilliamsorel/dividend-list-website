export default class FiltersController {
    form: HTMLFormElement | undefined
    button: HTMLButtonElement | null

    constructor(selectorString: string) {
        this.form = document.querySelector(selectorString) as HTMLFormElement | undefined
        this.button = document.querySelector('#filter-toggle')
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault()
            this.updateFiltersCount()
            const rawData = new FormData(this.form)
            const formattedData = this.formatFiltersData(rawData)
            const filterEvent = new CustomEvent('filter', { detail: { results: formattedData } })
            window.dispatchEvent(filterEvent)
            this.form?.parentElement?.classList.toggle('open')
        })
        this.button?.addEventListener('click', () => {
            this.form?.parentElement?.classList.toggle('open')
        })
    }

    private countFilters() {
        const inputs = this.form && Array.from(this.form.querySelectorAll('input')).filter((input) => input.type != 'submit')
        const selects = this.form && Array.from(this.form.querySelectorAll('select'))
        const inputCount = inputs ? inputs.reduce((acc, input) => acc + (input.value.length > 0 ? 1 : 0), 0) : 0
        const selectsCount = selects ? selects.map((select) => !select.value.match(/^$|ALL/) ? 1 : 0).reduce((acc, c) => acc + c, 0) : 0
        return inputCount + selectsCount
    }

    private updateFiltersCount() {
        const filtersCounterHtml = this.button?.querySelector('#filter-counter')
        if (filtersCounterHtml) {
            filtersCounterHtml.innerHTML = this.countFilters() > 0 ? `(${this.countFilters()})` : ''
        }
    }

    private formatFiltersData(formData: FormData) {
        const data = Array.from(formData.entries())
        const modifiedData = data.map((item: [string, FormDataEntryValue]) => {
            if (item[1].toString().length < 1) {
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
        return modifiedData.reduce((acc: { [index: string]: string | number | (string | number)[] }, data: FormDataEntryValue[] | undefined) => {
            if (!data) return;
            const index = data[0] as string | number
            if (acc[index]) {
                if (!Array.isArray(acc[index])) {
                    acc[index] = [acc[index]] as (string | number)[]
                }
                const arr = acc[index] as (string | number)[]
                arr.push(data[1] as string | number)
            } else {
                acc[index] = data[1] as string | number
            }
            return acc
        }, {})
    }
}