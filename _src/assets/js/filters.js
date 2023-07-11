import { convertSlug } from "./utils.js"

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
  },
  stockTypes: ['ALL']
}

function applyMultiSelectValues(select, values) {
  const options = Array.from(select.options)
  options.forEach((option) => {
    if (values.includes(option.value)) {
      option.selected = true
    }
  })
}

function countFilters() {
  const button = document.querySelector('#filter-toggle')
  const component = document.querySelector('.component.filters')

  const countFilters = (() => {
    const inputs = Array.from(component.querySelectorAll('input'))
    const selects = Array.from(component.querySelectorAll('select'))
    const inputCount = inputs.reduce((acc, input) => acc + (input.value.length > 0 ? 1 : 0), 0)
    const selectsCount = selects.map((select) => !select.value.match(/^$|ALL/) ? 1 : 0).reduce((acc, c) => acc + c, 0)
    return inputCount + selectsCount
  })()

  button.querySelector('#filter-counter').innerHTML = countFilters > 0 ? `(${countFilters})` : ''
}

function updateState() {
  const filtersContainer = document.querySelector('.filters-container')
  const filters = Array.from(filtersContainer.querySelectorAll('[data-filter]'))
  const filtersState = JSON.parse(localStorage.getItem('filters')) || filterDefaults

  filters.forEach((filter) => {
    const tag = filter.getAttribute('data-filter')
    const [filterName, boundary] = convertSlug(tag)

    if (filtersState[filterName][boundary]) {
      if (filtersState[filterName][boundary] != filterDefaults[filterName][boundary]) {
        filter.value = filtersState[filterName][boundary]
      }
    } else if (filter.tagName === "SELECT") {
      if (filtersState[filterName] != filterDefaults[filterName]) {
        applyMultiSelectValues(filter, filtersState[filterName])
      }
    }
  })

  bindButton()
}

function bindButton() {
  const filterButton = document.querySelector('#filter-toggle')
  const filtersComponent = document.querySelector('.component.filters')

  countFilters()

  filterButton.addEventListener('click', () => {
    filtersComponent.classList.toggle('open')
  })
}

export default function initializeFilters() {
  const filtersContainer = document.querySelector('.filters-container')
  const filters = Array.from(filtersContainer.querySelectorAll('[data-filter]'))

  console.log(filters)

  if (!filtersContainer) return

  updateState()

  filters.forEach((filter) => {
    filter.addEventListener('change', (e) => {
      let values;
      if (e.target.tagName === 'SELECT') {
        const options = e.target && Array.from(e.target.options)
        values = options.filter((option) => option.selected).map((option) => option.value)
      } else {
        values = e.target.value
      }

      const filterEvent = new CustomEvent("filter", { detail: { filter: e.target.getAttribute('data-filter'), value: values } })
      window.dispatchEvent(filterEvent)

      countFilters()
    })
  })
}