import Table from './table.js'
import { initializeStickyNav, initializeMobileNav } from './nav.js'
import initializeCharts from './stockPage.js'
import initializeSearch from './search.js'
import initializeFilters from './filters.js'

initializeStickyNav()
initializeMobileNav()

const table = new Table()
table.initializeTable()

if (window.location.pathname.includes('/stocks/')) {
  initializeCharts()
}
initializeSearch()
initializeFilters()