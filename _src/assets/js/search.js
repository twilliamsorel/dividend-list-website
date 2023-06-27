import { getRequest } from "./utils.js"

export default function initializeSearch() {
  const searchBar = document.querySelector('input.search')

  if (!searchBar) return

  searchBar.addEventListener('keyup', async (e) => {
    const res = searchBar.value.length > 1 ? (await getRequest(`http://localhost:5000/api/search-stocks?search=${searchBar.value}`)) : False

    // create custom event emitter, that the table object listens for. 
    // If result is not false, render new results. 
    // Otherwise, clear and reset table.
    console.log(JSON.parse(res))
  })
}