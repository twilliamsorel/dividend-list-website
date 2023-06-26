import Table from './table.js'
import { stickyNav } from './nav.js'
import initializeCharts from './stockPage.js'

stickyNav()

const table = new Table()
table.initializeTable()

if (window.location.pathname.includes('/stocks/')) {
  initializeCharts()
}