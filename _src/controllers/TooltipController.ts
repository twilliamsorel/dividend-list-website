export default class TooltipController {
    constructor() {
        this.div = undefined
        this.shown = false
        document.body.addEventListener('mouseover', (e) => {
            if (!e.target.getAttribute('data-tooltip')) return;
            this.#createTooltip(e)
            this.#positionTooltip(e)
            this.shown = true
            setTimeout(() => {
                if (this.shown === true) {
                    document.body.appendChild(this.div)
                }
            }, 1000)
        })
        document.body.addEventListener('mousemove', (e) => {
            if (!e.target.getAttribute('data-tooltip') || !this.div) return;
            this.#positionTooltip(e)
        })
        window.addEventListener('scroll', (e) => this.#removeTooltip())
        document.body.addEventListener('mouseout', (e) => this.#removeTooltip())
        window.addEventListener('click', (e) => this.#removeTooltip())
    }

    #positionTooltip (e) {
        if (!this.div || !e.target.getAttribute('data-tooltip')) return;
        this.div.style.left = (e.clientX + 10) + 'px'
        this.div.style.top = (e.clientY + window.scrollY + 10) + 'px'
    }

    #removeTooltip () {
        if (!this.div) return;
        this.shown = false
        this.div.remove()
        this.div = undefined
    }

    #createTooltip (e) {
        this.div = document.createElement('div')
        this.div.classList.add('tooltip')
        this.div.innerHTML = e.target.getAttribute('data-tooltip')
    }
}