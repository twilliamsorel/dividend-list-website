export default function getTable() {
  const table = document.querySelector('table')

  const dummyData = [
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'STP', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'STP', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'STP', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'STP', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'GOF', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'STP', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
    { 'ticker': 'STP', 'stockPrice': '$12.50', 'dyDollar': '$1.27', 'dyPercent': '17.55%' },
  ]

  if (!table) return

  const tbody = table.querySelector('tbody.information')

  const paginate = (start, end, data) => {
    const set = data.slice(start, end + 1)

    set.forEach((d) => {
      const templateString = `
        <tr>
          <td><a href="/">${d.ticker}</a></td>
          <td>${d.stockPrice}</td>
          <td>${d.dyDollar}</td>
          <td>${d.dyPercent}</td>
        </tr>
        <tr class="spacer"></tr>
        `
      tbody.insertAdjacentHTML('beforeend', templateString)
    })
  }

  paginate(0, 9, dummyData)

  // PAGINATION
  let pagination = 1

  window.addEventListener('scroll', (e) => {
    if ((window.scrollY + window.innerHeight) + 1 >= document.body.clientHeight) {
      paginate((pagination * 10), ((pagination + 1) * 10), dummyData)
      pagination++;
    }
  })
}