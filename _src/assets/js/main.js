import Table from './table.js'
import { initializeStickyNav, initializeMobileNav } from './nav.js'
import initializeCharts from './stockPage.js'
import initializeSearch from './search.js'
import initializeFilters from './filters.js'
import { initializeTooltips } from './tooltips.js'
import initializePopup from './popup.js'

// TEMP CLEANERS
const filters = JSON.parse(localStorage.getItem('filters'))
const hasStockType = filters && filters.stockTypes
if (!hasStockType) localStorage.removeItem('filters')

initializeStickyNav()
initializeMobileNav()

const table = new Table()
table.initializeTable()

if (window.location.pathname.includes('/stocks/')) {
  initializeCharts()
}
initializeSearch()
initializeFilters()
initializeTooltips()
initializePopup()