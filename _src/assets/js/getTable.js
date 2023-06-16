import { initializePagination, getRequest } from "./utils.js"


// TODO: pull local data from local storage object
const localData = [
  {
    "cash_amount": 5.4252136334,
    "company": "Cornerstone Strategic Value Fund, Inc.",
    "currency": "USD",
    "declaration_date": "1996-11-14",
    "dividend_price": 1.47,
    "dividend_type": "CD",
    "dividend_yield": 18.06,
    "ex_dividend_date": "1996-12-24",
    "frequency": 12,
    "id": 1,
    "pay_date": "2008-10-10",
    "record_date": "2008-10-15",
    "stock_price": 8.16,
    "ticker": "CLM"
  },
  {
    "cash_amount": 25.3988952606,
    "company": null,
    "currency": "USD",
    "declaration_date": "2015-03-02",
    "dividend_price": null,
    "dividend_type": "CD",
    "dividend_yield": null,
    "ex_dividend_date": "2015-04-01",
    "frequency": 12,
    "id": 2,
    "pay_date": "2015-05-01",
    "record_date": "2015-03-23",
    "stock_price": null,
    "ticker": "NXDT"
  },
  {
    "cash_amount": 5.74,
    "company": "Credit Suisse X-Links Crude Oil Shares Covered Call ETN",
    "currency": "USD",
    "declaration_date": "2020-04-03",
    "dividend_price": 1.49,
    "dividend_type": "CD",
    "dividend_yield": 33.95,
    "ex_dividend_date": "2020-04-21",
    "frequency": 12,
    "id": 3,
    "pay_date": "2018-10-25",
    "record_date": "2018-10-22",
    "stock_price": 74.13,
    "ticker": "USOI"
  }
]

export default async function getTable() {
  const table = document.querySelector('table')
  if (!table) return

  const source = table.getAttribute('data-source')
  const tbody = table.querySelector('tbody.information')
  const data = source === "localstorage" ? localData : JSON.parse(await getRequest('/assets/data/data.json'))
  const template = (d) => {
    if (!d.dividend_yield || d.dividend_yield === 0) return ""

    return `
      <tr>
        <td><a href="/stocks/${d.ticker}">${d.ticker}</a></td>
        <td>$ ${d.stock_price}</td>
        <td>$ ${d.dividend_price}</td>
        <td>% ${((d.dividend_price / d.stock_price) * 100).toFixed(2)} : ${d.dividend_yield}</td>
      </tr>
    `
  }

  const paginate = initializePagination(data, template, tbody, 10)
  paginate()

  window.addEventListener('scroll', (e) => {
    if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight) {
      paginate()
    }
  })
}