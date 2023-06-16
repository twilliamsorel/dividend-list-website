export function stickyNav() {
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