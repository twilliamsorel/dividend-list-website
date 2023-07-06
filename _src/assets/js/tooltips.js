export function initializeTooltips() {
  let div = undefined
  let shown = false

  const positionTooltip = (e) => {
    div.style.left = (e.clientX + 10) + 'px'
    div.style.top = (e.clientY + window.scrollY + 10) + 'px'
  }

  const removeTooltip = () => {
    shown = false
    div.remove()
  }

  document.body.addEventListener('mouseover', (e) => {
    if (e.target.getAttribute('data-tooltip')) {
      div = document.createElement('div')
      div.classList.add('tooltip')
      div.innerHTML = e.target.getAttribute('data-tooltip')
      shown = true
      positionTooltip(e)

      setTimeout(() => {
        if (shown === true) {
          document.body.appendChild(div)
        }
      }, 1000)
    }
  })

  document.body.addEventListener('mousemove', (e) => {
    if (e.target.getAttribute('data-tooltip')) {
      if (div) {
        positionTooltip(e)
      }
    }
  })

  window.addEventListener('scroll', removeTooltip)

  document.body.addEventListener('mouseout', (e) => {
    if (e.target.getAttribute('data-tooltip')) {
      removeTooltip()
    }
  })

  window.addEventListener('click', removeTooltip)
}