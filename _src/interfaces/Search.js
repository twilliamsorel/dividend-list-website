import Utils from "/interfaces/utils.js"

export default class Search {
    constructor(selectorString) {
        this.input = document.querySelector(selectorString)
        this.frozen = false
        this.throttleTime = 400
        this.input.addEventListener('keyup', () => this.#runSearch())
        if (this.input.value.length > 0) this.#runSearch()
    }

    #runSearch() {
        !this.frozen && setTimeout(async () => {
            const res = this.input.value.length > 0 ? (await Utils.getRequest(`${Utils.getBaseUrl()}/api/search-stocks?search=${this.input.value}`)) : false
            const searchEvent = new CustomEvent("search", { detail: { results: JSON.parse(res), length: this.input.value.length } })
            window.dispatchEvent(searchEvent)
            this.frozen = false
        }, this.throttleTime)
        this.frozen = true
    }
}