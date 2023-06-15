export function stickyNav() {
  const nav = document.querySelector('.main-nav')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('sticky')
    } else {
      nav.classList.remove('sticky')
    }
  })
}