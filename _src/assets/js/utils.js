export function initializePagination(data, template, target, range) {
  let iterator = 0

  return () => {
    const start = iterator * range
    const end = (iterator + 1) * range

    const set = data.slice(start, end)

    set.forEach((d) => {
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
      }
    }

    xhr.open("GET", url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
  })
}