interface DataProps {
    id: number
}

export default class StorageManager {
    name: string | undefined
    data: any[] | undefined

    constructor(name: string) {
        this.name = name
        this.data = []
        this.fetchData()
    }

    add(data: DataProps) {
        if (!(typeof data === 'object') || !data.id) throw Error("Storage manager must be of type Object[{ id: string ...}]. Please push data in the form of an object with an id.")
        if (this.getById(data.id) || !this.data) return
        this.data.push(data)
        this.setStorage()
        return this
    }

    get read() {
        return this.data
    }

    getById(id: number) {
        return this.data?.filter((item) => item.id === id)[0]
    }

    remove(id: number) {
        this.data = this.data?.filter((item) => !(item.id === id))
        this.setStorage()
        return this
    }

    private setStorage() {
        this.name && localStorage.setItem(this.name, JSON.stringify(this.data))
    }

    delete() {
        this.name && localStorage.removeItem(this.name)
        this.data = undefined
        this.name = undefined
    }

    private fetchData() {
        if (!this.name) return;
        const data = localStorage.getItem(this.name)
        if (!data) return
        this.data = JSON.parse(data)
    }
}