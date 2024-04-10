export default class StockTable {
    sort: string
    sortDirection: string
    filters: object | undefined
    page: number

    constructor() {
        this.sort = 'ticker'
        this.sortDirection = 'desc'
        this.filters = undefined
        this.page = 0
    }

    setFilters(filters: object) {
        this.filters = filters
    }

    paginate() {
        this.page++
    }

    resetPage() {
        this.page = 0;
    }

    setSort(sort: string) {
        this.sort = sort
        this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    }
}