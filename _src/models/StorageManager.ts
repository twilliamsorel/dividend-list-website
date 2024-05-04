interface DataProps {
    id: number
}

export default class StorageManager {
    name: string | undefined
    storageType: string
    data: any[] | undefined

    constructor(name: string, type?: string) {
        this.name = name
        this.storageType = type || 'localStorage'
        this.data = []
        this.fetchData()
    }

    public add(data: DataProps) {
        if (!(typeof data === 'object') || !data.id) throw Error("Storage manager must be of type Object[{ id: string ...}]. Please push data in the form of an object with an id.")
        if (this.getById(data.id) || !this.data) return
        this.data.push(data)
        this.setStorage()
        return this
    }

    get read() {
        return this.data
    }

    public getById(id: number) {
        return this.data?.filter((item) => item.id === id)[0]
    }

    public remove(id: number) {
        this.data = this.data?.filter((item) => !(item.id === id))
        this.setStorage()
        return this
    }

    private setStorage() {
        if (this.storageType === 'localStorage') {
            this.name && localStorage.setItem(this.name, JSON.stringify(this.data))
        } else if (this.storageType === 'sessionStorage') {
            this.name && sessionStorage.setItem(this.name, JSON.stringify(this.data))
        }
    }

    public delete() {
        this.name && localStorage.removeItem(this.name)
        this.data = undefined
        this.name = undefined
    }

    private fetchData() {
        if (!this.name) return;
        const data = ((name: string) => {
            if (this.storageType === 'localStorage') {
                return localStorage.getItem(name)
            } else if (this.storageType === 'sessionStorage') {
                return sessionStorage.getItem(name)
            }
        })(this.name)
        if (!data) return
        this.data = JSON.parse(data)
    }
}