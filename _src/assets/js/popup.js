import { getRequest } from './utils.js'

function entry(data) {
  return `
    <div class="molecule popup-announcement">
      <header>
        <h4>${data.title}</h4>
        <time>${data.date}</time>
      </header>
      <p>${data.description}</p>
      <hr>
    </div>
  `
}

async function triggerPopup(popup) {
  const announcements = JSON.parse(await getRequest('/assets/js/announcements.json'))
  const storedAnnouncements = JSON.parse(localStorage.getItem('announcements'))

  const newAnnouncements = storedAnnouncements ? announcements.filter((a) => !storedAnnouncements.includes(a.id)) : announcements;

  if (newAnnouncements.length === 0) return

  const entriesContainer = popup.querySelector('.entries')
  newAnnouncements.forEach((a) => {
    entriesContainer.insertAdjacentHTML('beforeend', entry(a))
  })

  document.body.classList.toggle('popup')

  const newIds = newAnnouncements.map((a) => a.id)
  const allAnnouncements = storedAnnouncements ? storedAnnouncements.concat(newIds) : newIds

  localStorage.setItem('announcements', JSON.stringify(allAnnouncements))
}

export default function initializePopup() {
  const popup = document.querySelector('.component.popup');

  popup.addEventListener('click', (e) => {
    const target = e.target;
    if (target.getAttribute('data-action') === 'close' || target.classList.contains('popup-bg')) {
      document.body.classList.toggle('popup')
    }
  })

  triggerPopup(popup)
}