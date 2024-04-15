import Utils from '/Utils.js'
import StorageManager from '/models/StorageManager.js'

// SAVE BUTTON
(() => {
  const button = document.querySelector('[data-save]')

  if (!button) return

  const ticker = button.getAttribute('data-save')
  const storage = new StorageManager('stocks')

  const getButtonStatus = (value) => {
    const exists = storage.getById(value)
    return exists
  }

  const setButtonState = (status) => {
    button.innerHTML = status ? 'unsave' : 'save'
  }

  setButtonState(getButtonStatus(ticker))

  button.addEventListener('click', () => {
    getButtonStatus(ticker) ? storage.remove(ticker) : storage.add({ id: ticker })
    setButtonState(getButtonStatus(ticker))
  })
})()

function truncateRecords(data) {
  const numRecords = data.length
  const recordSkip = Math.ceil(numRecords / 48)
  return data.filter((r, i) => (i === 0) || (i === numRecords - 1) || (i % recordSkip) === 0)
}

export default async function initializeCharts() {
  const baseUrl = Utils.getBaseUrl()
  const ticker = document.querySelector('#ticker-interface').value
  const frequency = document.querySelector('#frequency-interface').value
  const stockRes = await Utils.getRequest(`${baseUrl}/api/get-stock-history?ticker=${ticker}`)
  const truncatedStocks = truncateRecords(stockRes)
  const dividend_yield = truncatedStocks.map((d) => d.cash_amount.toFixed(2)).reverse()
  const stock_price = truncatedStocks.map((d) => d.stock_price.toFixed(2)).reverse()
  const volume = truncatedStocks.map((d) => d.volume).reverse()
  const labels = truncatedStocks.map((d) => d.pay_date).reverse()
  const yield_percent = truncatedStocks.map((d) => (d.cash_amount / d.stock_price)).reverse()

  const dividendRes = await Utils.getRequest(`${baseUrl}/api/get-dividend-history?ticker=${ticker}`)
  const truncatedDividends = truncateRecords(dividendRes)
  const allDividends = truncatedDividends.map((d) => d.cash_amount.toFixed(2)).reverse()
  const allDividendDates = truncatedDividends.map((d) => d.pay_date).reverse()

  if (labels.length < frequency) {
    Array.from(document.querySelectorAll('[data-projected]')).forEach((e) => {
      const span = document.createElement('span')
      span.innerHTML = "(YTD)"
      span.classList.add('projected')
      e.appendChild(span)
    })
  }

  const fullDividendChart = document.getElementById('full-dividend-chart');

  new Chart(fullDividendChart, {
    type: 'line',
    resize: true,
    data: {
      labels: allDividendDates,
      datasets: [
        {
          label: 'dividend yield, all records',
          data: allDividends,
          borderWidth: 2,
          backgroundColor: 'green',
          borderColor: 'green',
          color: 'green'
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem, data) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(tooltipItem.raw)
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value)
            }
          },
          beginAtZero: true
        }
      }
    }
  });

  const stockChart = document.getElementById('stock-chart');

  new Chart(stockChart, {
    type: 'line',
    resize: true,
    data: {
      labels: labels,
      datasets: [
        {
          label: 'stock price',
          data: stock_price,
          borderWidth: 2,
          backgroundColor: '#0099CA',
          borderColor: '#0099CA',
          color: '#0099CA'
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem, data) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(tooltipItem.raw)
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value)
            }
          },
          beginAtZero: true
        }
      }
    }
  });

  const dividendChart = document.getElementById('dividend-chart');

  new Chart(dividendChart, {
    type: 'line',
    resize: true,
    data: {
      labels: labels,
      datasets: [
        {
          label: 'dividend yield, with stock info',
          data: dividend_yield,
          borderWidth: 2,
          backgroundColor: 'green',
          borderColor: 'green',
          color: 'green'
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem, data) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(tooltipItem.raw)
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value)
            }
          },
          beginAtZero: true
        }
      }
    }
  });

  const volumeChart = document.getElementById('volume-chart');

  new Chart(volumeChart, {
    type: 'line',
    resize: true,
    data: {
      labels: labels,
      datasets: [
        {
          label: 'trade volume',
          data: volume,
          borderWidth: 2,
          backgroundColor: '#E49B2D',
          borderColor: '#E49B2D',
          color: '#E49B2D'
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem, data) => {
              return new Intl.NumberFormat('en-US').format(tooltipItem.raw)
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const percentageChart = document.getElementById('percentage-chart');

  new Chart(percentageChart, {
    type: 'line',
    resize: true,
    data: {
      labels: labels,
      datasets: [
        {
          label: 'yield percentage by month',
          data: yield_percent,
          borderWidth: 2,
          backgroundColor: 'green',
          borderColor: 'green',
          color: 'green'
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem, data) => {
              return new Intl.NumberFormat('en-US', {
                style: 'percent',
                maximumFractionDigits: 2
              }).format(tooltipItem.raw)
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'percent',
                maximumFractionDigits: 2
              }).format(value)
            }
          },
          beginAtZero: true
        }
      }
    }
  });

  window.addEventListener('resize', (e) => {
    percentageChart.style.width = '100%';
    percentageChart.style.height = 'auto'
    volumeChart.style.width = '100%';
    volumeChart.style.height = 'auto'
    stockChart.style.width = '100%';
    stockChart.style.height = 'auto'
    dividendChart.style.width = '100%';
    dividendChart.style.height = 'auto'
  })
}