export default class Search {
    input: HTMLInputElement | null
    frozen: boolean
    throttleTime: number

    constructor(selectorString: string) {
        this.input = document.querySelector(selectorString)
        this.frozen = false
        this.throttleTime = 400
        this.input?.addEventListener('keyup', () => this.runSearch())
        if (this.input && this.input.value.length > 0) this.runSearch()
    }

    private runSearch() {
        !this.frozen && setTimeout(async () => {
            const searchEvent = new CustomEvent("search", { detail: { results: this.input?.value } })
            window.dispatchEvent(searchEvent)
            this.frozen = false
        }, this.throttleTime)
        this.frozen = true
    }
}