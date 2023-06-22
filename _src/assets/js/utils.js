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