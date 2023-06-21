import getTable, { tableInterface } from './table.js'
import { stickyNav } from './nav.js'
import { manageFilters } from './utils.js'

const filter = manageFilters()

stickyNav()
tableInterface()
getTable(filter)