// rewrite as a class?

import { getRequest } from './utils.js'

function TableHead(filter) {
  const thead = `
    <tr class="label">
      <td data-filter="ticker" ${filter[0] === 'ticker' ? 'class="active"' : ''}>ticker</td>
      <td data-filter="volatility" ${filter[0] === 'volatility' ? 'class="active"' : ''}>
        <span class="d-inline-block d-lg-none">div vol</span>
        <span class="d-none d-lg-inline-block">dividend volatility</span>
      </td>
      <td class="d-none d-lg-table-cell ${filter[0] === 'stock_price' ? 'active' : ''}" data-filter="stock_price">stock price</td>
      <td class="d-none d-md-table-cell ${filter[0] === 'dividend_price' ? 'active' : ''}" data-filter="dividend_price">
        <span class="d-inline-block d-md-none">div yield ($)</span>
        <span class="d-none d-md-inline-block">dividend yield ($)</span>
      </td>
      <td data-filter="dividend_yield" ${filter[0] === 'dividend_yield' ? 'class="active"' : ''}>
        <span class="d-inline-block d-lg-none">div yield (%)</span>
        <span class="d-none d-lg-inline-block">dividend yield (%)</span>
      </td>
    </tr>
  `
  document.querySelector('thead').insertAdjacentHTML('beforeend', thead)
}

function TableBody(d) {
  return `
    <tr>
      <td><a href="/stocks/${d.ticker}">${d.ticker}</a></td>
      <td>${d.volatility.toFixed(2)}</td>
      <td class="d-none d-md-table-cell">$ ${d.stock_price.toFixed(2)}</td>
      <td class="d-none d-lg-table-cell">$ ${d.dividend_price.toFixed(2)}</td>
      <td>% ${d.dividend_yield.toFixed(2)}</td>
    </tr>
  `
}

export default async function getTable(filter) {
  const table = document.querySelector('table')
  if (!table) return

  resetTable(table)

  TableHead(filter)

  const source = table.getAttribute('data-source')
  const tbody = table.querySelector('tbody.information')

  const paginate = initializePagination(source, TableBody, tbody, filter)
  await paginate()

  window.addEventListener('scroll', (e) => {
    if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight) {
      paginate()
    }
  })
}

function resetTable(table) {
  const rows = table.querySelectorAll('table tr')

  rows.forEach((r) => {
    r.remove()
  })
}

export function initializePagination(source, template, target, filter) {
  let iterator = 0

  return async () => {
    const data = source === "localstorage" ? localData : JSON.parse(await getRequest(`http://localhost:5000/api/get-stocks?pagination=${iterator}&filter=${filter[0]}&direction=${filter[1]}`))

    if (data.length === 0) return

    data.forEach((d) => {
      target.insertAdjacentHTML('beforeend', template(d))
    })

    iterator++
  }
}

export function manageFilters(filter, direction) {
  const setFilter = (filter, direction = "desc") => {
    const temp = [filter, direction]
    localStorage.setItem('filter', JSON.stringify(temp))
    return temp
  }
  const output = filter ? setFilter(filter, direction) : JSON.parse(localStorage.getItem('filter')) || ['dividend_yield', 'desc']

  return output
}

export function tableInterface() {
  const thead = document.querySelector('thead')
  if (!thead) return

  thead.addEventListener('click', (e) => {
    const filter = manageFilters(e.target.getAttribute('data-filter'), 'desc')
    getTable(filter)
  })
}