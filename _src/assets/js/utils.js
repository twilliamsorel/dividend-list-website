export function manageFilters(filter, direction) {
  const setFilter = (filter, direction = "desc") => {
    const temp = [filter, direction]
    localStorage.setItem('filter', JSON.stringify(temp))
    return temp
  }
  const output = filter ? setFilter(filter, direction) : JSON.parse(localStorage.getItem('filter')) || ['dividend_yield', 'desc']

  return output
}

export function initializePagination(source, template, target, filter) {
  let iterator = 0

  // TODO: add data from local storage (for users' saved stocks)

  return async () => {
    const data = source === "localstorage" ? localData : JSON.parse(await getRequest(`http://localhost:5000/api/get-stocks?pagination=${iterator}&filter=${filter[0]}&direction=${filter[1]}`))

    if (data.length === 0) return

    data.forEach((d) => {
      target.insertAdjacentHTML('beforeend', template(d))
    })

    iterator++
  }
}

export function getRequest(url) {
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