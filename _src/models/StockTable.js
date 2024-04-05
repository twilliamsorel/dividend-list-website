export default class StockTable {
    constructor() {
        this.sort = 'ticker'
        this.sortDirection = 'desc'
        this.filters = undefined
        this.page = 0
    }

    setFilters(filters) {
        this.filters = filters
    }

    paginate() {
        this.page++
    }

    resetPage() {
        this.page = 0;
    }

    setSort(sort) {
        this.sort = sort
        this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    }
}