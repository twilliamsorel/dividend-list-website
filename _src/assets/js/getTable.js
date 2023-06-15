import { initializePagination, getRequest } from "./utils.js"


// TODO: pull local data from local storage object
const localData = [
  {
    "ticker": "CLM",
    "stockPrice": "$12.50",
    "dividendPrice": "$1.27",
    "dividendYield": "17.55%",
    "dividendType": "CD",
    "company": "Cornerstone Strategic Value Fund, Inc."
  },
  {
    "ticker": "CLM",
    "stockPrice": "$12.50",
    "dividendPrice": "$1.27",
    "dividendYield": "17.55%",
    "dividendType": "CD",
    "company": "Cornerstone Strategic Value Fund, Inc."
  },
  {
    "ticker": "CLM",
    "stockPrice": "$12.50",
    "dividendPrice": "$1.27",
    "dividendYield": "17.55%",
    "dividendType": "CD",
    "company": "Cornerstone Strategic Value Fund, Inc."
  }
]

export default async function getTable() {
  const table = document.querySelector('table')
  if (!table) return

  const source = table.getAttribute('data-source')
  const tbody = table.querySelector('tbody.information')
  const data = source === "localstorage" ? localData : JSON.parse(await getRequest('/assets/data/data.json'))
  const template = (d) => `
  <tr>
    <td><a href="/">${d.ticker}</a></td>
    <td>${d.stockPrice}</td>
    <td>${d.dividendPrice}</td>
    <td>${d.dividendYield}</td>
  </tr>
  `

  const paginate = initializePagination(data, template, tbody, 10)
  paginate()

  window.addEventListener('scroll', (e) => {
    if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight) {
      paginate()
    }
  })
}