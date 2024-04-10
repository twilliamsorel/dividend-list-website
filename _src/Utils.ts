class Utils {
    getRequest(url: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(this.response)
                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                    reject(this.response)
                }
            }
            xhr.open("GET", url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
        })
    }

    async postRequest(url: string, data: object | any[]): Promise<any[]> {
        const result: Promise<string> = new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(this.response)
                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                    reject(this.response)
                }
            }
            xhr.open("POST", url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        })
        return JSON.parse(await result)
    }

    getBaseUrl(): string {
        const el: HTMLInputElement | null = document.querySelector('[data-bind="environment"]')
        const env = el ? el.value : false
        const baseUrl = env === 'development' ? 'http://127.0.0.1:5000' : "https://thedividendlist.com"
        return baseUrl
    }

    convertSlug(s: string) {
        if (!s.match(/[a-z-]+/) || s.length < 3) return;
        const temp = s.split('-')
        const boundary = temp.at(-1)?.match(/(max|min)$/) ? temp.pop() : false
        const filter = temp.map((s, i) => i > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s).join('')
        return [filter, boundary]
    }
}

export default new Utils()