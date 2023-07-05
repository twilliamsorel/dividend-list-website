import { getRequest, getBaseUrl } from "./utils.js"

export default function initializeSearch() {
  const searchBar = document.querySelector('input.search')
  let notFrozen = true
  const baseUrl = getBaseUrl()

  if (!searchBar) return

  const runSearch = () => {
    notFrozen && setTimeout(async () => {
      const res = searchBar.value.length > 1 ? (await getRequest(`${baseUrl}/api/search-stocks?search=${searchBar.value}`)) : false
      const searchEvent = new CustomEvent("search", { detail: { results: JSON.parse(res) } })

      window.dispatchEvent(searchEvent)
      notFrozen = true
    }, 1000)

    notFrozen = false
  }

  searchBar.addEventListener('keyup', runSearch)
  window.addEventListener('load', () => { if (searchBar.value.length > 1) runSearch() })
}