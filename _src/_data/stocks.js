const fetch = require('node-fetch');

const data = (async function () {
  const results = await (() => {
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:5000/api/get-all-stocks', {
        method: 'GET',
        headers: {
          'Accept': ['application/json', '*/*'],
          'Content-Type': 'application/json'
        }
      }).then((res, err) => {
        if (err) { reject(err) } else {
          resolve(res)
        }
      })
    })
  })()

  return results.json()
}())

module.exports = function () {
  return data
}