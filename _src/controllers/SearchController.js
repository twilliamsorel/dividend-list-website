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
            const searchEvent = new CustomEvent("search", { detail: { results: this.input.value } })
            window.dispatchEvent(searchEvent)
            this.frozen = false
        }, this.throttleTime)
        this.frozen = true
    }
}