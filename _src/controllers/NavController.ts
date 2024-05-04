export default class Nav {
    nav: HTMLElement | null
    navButtons: Element[] | null

    constructor(selectorString: string) {
        this.nav = document.querySelector(selectorString)
        this.navButtons = Array.from(document.querySelectorAll('[data-bind="mobile-nav-button"]'))
        window.addEventListener('scroll', () => this.triggerSticky())
        document.addEventListener('load', () => this.triggerSticky())
        this.navButtons.forEach((button) => {
            button.addEventListener('click', () => {
                document.body.classList.toggle('open')
            })
        })
    }

    private triggerSticky() {
        if (window.scrollY > 0) {
            this.nav?.classList.add('sticky')
        } else {
            this.nav?.classList.remove('sticky')
        }
    }
}