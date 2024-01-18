export function initializeStickyNav() {
  const nav = document.querySelector('.main-nav')

  const triggerSticky = () => {
    if (window.scrollY > 0) {
      nav.classList.add('sticky')
    } else {
      nav.classList.remove('sticky')
    }
  }

  window.addEventListener('scroll', triggerSticky)
  document.addEventListener('load', triggerSticky)
}

export function initializeMobileNav() {
  const navButtons = Array.from(document.querySelectorAll('[data-bind="mobile-nav-button"]'))
  // const mobileNav = document.querySelector('[data-bind="mobile-nav"]')

  navButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      document.body.classList.toggle('open')
    })
  })
}