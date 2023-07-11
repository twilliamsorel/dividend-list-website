import { getRequest, getBaseUrl } from './utils.js'

// SAVE BUTTON
(() => {
  const button = document.querySelector('[data-save]')

  if (!button) return

  const ticker = button.getAttribute('data-save')
  const getCurrentStorage = () => JSON.parse(localStorage.getItem('stocks')) || false

  const getButtonStatus = (value) => {
    const currentStorage = getCurrentStorage()
    const exists = (currentStorage && currentStorage.filter((item) => item === value)).length > 0

    return exists
  }

  const setButtonState = (status) => {
    button.innerHTML = status ? 'unsave' : 'save'
  }

  const updateStorage = (f) => {
    const currentStorage = getCurrentStorage()
    const temp = f(currentStorage)
    const newStorage = temp.length === 0 ? null : temp

    localStorage.setItem('stocks', JSON.stringify(newStorage))
  }

  const removeItem = (value) => {
    updateStorage((currentStorage) => currentStorage && currentStorage.filter((item) => item !== value))
  }

  const addItem = (value) => {
    updateStorage((currentStorage) => currentStorage ? currentStorage.concat(value) : [value])
  }

  setButtonState(getButtonStatus(ticker))

  button.addEventListener('click', () => {
    getButtonStatus(ticker) ? removeItem(ticker) : addItem(ticker)
    setButtonState(getButtonStatus(ticker))
  })
})()

export default async function initializeCharts() {
  const baseUrl = getBaseUrl()
  const ticker = document.querySelector('#ticker-interface').value
  const res = JSON.parse(await getRequest(`${baseUrl}/api/get-dividend-history?ticker=${ticker}`))
  const numRecords = res.length
  const recordSkip = Math.ceil(numRecords / 48)
  const truncatedRes = res.filter((r, i) => (i === 0) || (i === numRecords - 1) || (i % recordSkip) === 0)
  const dividend_yield = truncatedRes.map((d) => d.cash_amount.toFixed(2)).reverse()
  const stock_price = truncatedRes.map((d) => d.stock_price.toFixed(2)).reverse()
  const volume = truncatedRes.map((d) => d.volume).reverse()
  const labels = truncatedRes.map((d) => d.pay_date).reverse()
  const yield_percent = truncatedRes.map((d) => (d.cash_amount / d.stock_price)).reverse()

  if (labels.length < 12) {
    Array.from(document.querySelectorAll('[data-projected]')).forEach((e) => {
      const span = document.createElement('span')
      span.innerHTML = "(YTD)"
      span.classList.add('projected')
      e.appendChild(span)
    })
  }

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
          label: 'dividend yield',
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