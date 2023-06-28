import Table from './table.js'
import { stickyNav } from './nav.js'
import initializeCharts from './stockPage.js'
import initializeSearch from './search.js'

stickyNav()

const table = new Table()
table.initializeTable()

if (window.location.pathname.includes('/stocks/')) {
  initializeCharts()
}

initializeSearch()