import { initializePagination, manageFilters } from "./utils.js"

export function tableInterface() {
  const thead = document.querySelector('thead')
  if (!thead) return

  thead.addEventListener('click', (e) => {
    const filter = manageFilters(e.target.getAttribute('data-filter'), 'desc')
    getTable(filter)
  })
}

function resetTable(table) {
  const rows = table.querySelectorAll('tbody tr')

  rows.forEach((r) => {
    r.remove()
  })
}

export default async function getTable(filter) {
  const table = document.querySelector('table')
  if (!table) return

  resetTable(table)

  const source = table.getAttribute('data-source')
  const tbody = table.querySelector('tbody.information')

  const template = (d) => {
    return `
      <tr>
        <td><a href="/stocks/${d.ticker}">${d.ticker}</a></td>
        <td>${d.volatility.toFixed(2)}</td>
        <td>$ ${d.stock_price.toFixed(2)}</td>
        <td>$ ${d.dividend_price.toFixed(2)}</td>
        <td>% ${d.dividend_yield.toFixed(2)}</td>
      </tr>
    `
  }

  const paginate = initializePagination(source, template, tbody, filter)
  await paginate()

  window.addEventListener('scroll', (e) => {
    if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight) {
      paginate()
    }
  })
}