import getTable, { tableInterface, manageFilters } from './table.js'
import { stickyNav } from './nav.js'

const filter = manageFilters()

stickyNav()
tableInterface()
getTable(filter)