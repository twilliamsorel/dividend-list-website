const axios = require('axios')
const fs = require('fs')

const data = (async function () {
  const results = await (() => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/api/get-stocks', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((res, err) => { if (err) reject(err); else resolve(res) })
    })
  })()

  fs.writeFileSync('_src/assets/data/data.json', JSON.stringify(results.data))

  return results.data
}())

module.exports = function () {
  return data
}