export const filterDefaults = {
  dividendYield: {
    min: 0,
    max: 50000
  },
  dividendVolatility: {
    min: 0,
    max: 4
  },
  stockPrice: {
    min: 0,
    max: 50000
  },
  stockVolatility: {
    min: 0,
    max: 4
  },
  apy: {
    min: 0,
    max: 6000
  },
  medianApy: {
    min: 0,
    max: 6000
  },
  records: {
    min: 0,
    max: 5000
  },
  volume: {
    min: 0,
    max: 100000000000
  }
}

function countFilters() {
  const button = document.querySelector('#filter-toggle')
  const component = document.querySelector('.component.filters')

  const countFilters = (() => {
    const inputs = Array.from(component.querySelectorAll('input'))
    return inputs.reduce((acc, input) => acc + (input.value.length > 0 ? 1 : 0), 0)
  })()

  button.querySelector('#filter-counter').innerHTML = countFilters > 0 ? `(${countFilters})` : ''
}

function updateState() {
  const filtersContainer = document.querySelector('.filters-container')
  const filters = Array.from(filtersContainer.querySelectorAll('[data-filter]'))
  const filtersState = JSON.parse(localStorage.getItem('filters')) || filterDefaults

  filters.forEach((filter) => {
    const tag = filter.getAttribute('data-filter')
    const filterName = tag.split('-').map((s, i) => i > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s).slice(0, -1).join('')
    const boundary = tag.split('-').slice(-1).toString()

    if (filtersState[filterName][boundary] != filterDefaults[filterName][boundary]) {
      filter.value = filtersState[filterName][boundary]
    }
  })

  bindButton()
}

function bindButton() {
  const filterButton = document.querySelector('#filter-toggle')
  const filtersComponent = document.querySelector('.component.filters')

  countFilters()

  filterButton.addEventListener('click', (e) => {
    filtersComponent.classList.toggle('open')
  })
}

export default function initializeFilters() {
  const filtersContainer = document.querySelector('.filters-container')
  let notFrozen = true

  if (!filtersContainer) return

  updateState()

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