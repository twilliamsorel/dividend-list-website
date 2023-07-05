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

export function postRequest(url, data) {
  return new Promise((resolve, reject) => {
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
}

export function getBaseUrl() {
  const env = document.querySelector('[data-bind="environment"]').value
  const baseUrl = env === 'development' ? 'http://localhost:5000' : "http://127.0.0.1:8000"
  console.log(env)

  return baseUrl
}