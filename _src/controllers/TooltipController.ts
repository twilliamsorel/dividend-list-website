export default class TooltipController {
    div: HTMLDivElement | undefined
    shown: boolean

    constructor() {
        this.div = undefined
        this.shown = false
        document.body.addEventListener('mouseover', (e: MouseEvent) => {
            const targetElement = e.target as HTMLElement
            if (!targetElement || !targetElement.getAttribute('data-tooltip')) return;
            this.createTooltip(e)
            this.positionTooltip(e)
            this.shown = true
            setTimeout(() => {
                if (this.shown === true) {
                    this.div && document.body.appendChild(this.div)
                }
            }, 1000)
        })
        document.body.addEventListener('mousemove', (e: MouseEvent) => {
            const targetElement = e.target as HTMLElement
            if (!targetElement || targetElement.getAttribute('data-tooltip') || !this.div) return;
            this.positionTooltip(e)
        })
        window.addEventListener('scroll', () => this.removeTooltip())
        document.body.addEventListener('mouseout', () => this.removeTooltip())
        window.addEventListener('click', () => this.removeTooltip())
    }

    private positionTooltip(e: MouseEvent) {
        const targetElement = e.target as HTMLElement
        if (!this.div || !targetElement || !targetElement.getAttribute('data-tooltip')) return;
        this.div.style.left = (e.clientX + 10) + 'px'
        this.div.style.top = (e.clientY + window.scrollY + 10) + 'px'
    }

    private removeTooltip() {
        if (!this.div) return;
        this.shown = false
        this.div.remove()
        this.div = undefined
    }

    private createTooltip(e: MouseEvent) {
        const targetElement = e.target as HTMLElement
        if (!targetElement || !targetElement.getAttribute('data-tooltip')) return;
        const tempDiv = document.createElement('div')
        const tooltip = targetElement.getAttribute('data-tooltip') || ''
        tempDiv.classList.add('tooltip')
        tempDiv.innerHTML = tooltip
        this.div = tempDiv
    }
}