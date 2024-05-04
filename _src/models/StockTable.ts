export default class StockTable {
    sort: string
    sortDirection: 'asc' | 'desc'
    filters: object | undefined
    page: number

    constructor() {
        this.sort = 'ticker'
        this.sortDirection = 'desc'
        this.filters = undefined
        this.page = 0
    }

    public setFilters(filters: object) {
        this.filters = filters
    }

    public paginate() {
        this.page++
    }

    public resetPage() {
        this.page = 0;
    }

    public setSort(sort: string) {
        this.sort = sort
        this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    }
}