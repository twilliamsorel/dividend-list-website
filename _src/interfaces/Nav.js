export default class Nav {
    constructor(selectorString) {
        this.nav = document.querySelector(selectorString)
        window.addEventListener('scroll', () => this.#triggerSticky())
        document.addEventListener('load', () => this.#triggerSticky())
        this.navButtons = Array.from(document.querySelectorAll('[data-bind="mobile-nav-button"]'))
        this.navButtons.forEach((button) => {
            button.addEventListener('click', () => {
                document.body.classList.toggle('open')
            })
        })
    }

    #triggerSticky () {
        if (window.scrollY > 0) {
            this.nav.classList.add('sticky')
        } else {
            this.nav.classList.remove('sticky')
        }   
    }
}