export default class StorageManager {
    constructor(name) {
        this.name = name
        this.data = []
        this.#fetchData()
    }

    add(data) {
        if (!(typeof data === 'object') || !data.id) throw Error("Storage manager must be of type Object[{ id: string ...}]. Please push data in the form of an object with an id.")
        if (this.getById(data.id)) return
        this.data.push(data)
        this.#setStorage()
        return this
    }

    get read() {
        return this.data
    }

    getById(id) {
        return this.data.filter((item) => item.id === id)[0]
    }

    remove(id) {
        this.data = this.data.filter((item) => !(item.id === id))
        this.#setStorage()
        return this
    }

    #setStorage () {
        localStorage.setItem(this.name, JSON.stringify(this.data))
    }

    delete() {
        localStorage.removeItem(this.name)
        this.data = undefined
        this.name = undefined
    }

    #fetchData() {
        const data = localStorage.getItem(this.name)
        if (!data) return
        this.data = JSON.parse(data)
    }
}