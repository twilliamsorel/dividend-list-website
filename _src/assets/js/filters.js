function countFilters() {
  const button = document.querySelector('#filter-toggle')
  const component = document.querySelector('.component.filters')

  const countFilters = (() => {
    const inputs = Array.from(component.querySelectorAll('input'))
    return inputs.reduce((acc, input) => acc + (input.value.length > 0 ? 1 : 0), 0)
  })()

  button.querySelector('#filter-counter').innerHTML = countFilters > 0 ? `(${countFilters})` : ''
}

function bindButton() {
  const filterButton = document.querySelector('#filter-toggle')
  const filtersComponent = document.querySelector('.component.filters')

  countFilters()

  filterButton.addEventListener('click', (e) => {
    filtersComponent.classList.toggle('open')
  })
}

function bindInputs() {
  const filtersContainer = document.querySelector('.filters-container')
  let notFrozen = true

  if (!filtersContainer) return

  filtersContainer.addEventListener('keyup', (e) => {
    notFrozen && setTimeout(() => {
      const filterEvent = new CustomEvent("filter", { detail: { filter: e.target.getAttribute('data-filter'), value: e.target.value } })
      window.dispatchEvent(filterEvent)

      countFilters()
      notFrozen = true
    }, 600)

    notFrozen = false
  })
}

export default function initializeFilters() {
  bindButton()
  bindInputs()
}