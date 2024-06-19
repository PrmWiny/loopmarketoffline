document.addEventListener('DOMContentLoaded', (event) => {
  const customTimeInput = document.getElementById('custom-time')
  let timeInterval = null // Global variable to hold setInterval reference
  toggleCurrentTime()
  // Function to set current time in the input field
  function setCurrentTime() {
    if (!timeInterval) return // Check if interval is active
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    customTimeInput.value = `${hours}:${minutes}:${seconds}`
  }

  setCurrentTime()

  // Toggle function to start/stop updating current time
  function toggleCurrentTime() {
    if (timeInterval) {
      clearInterval(timeInterval)
      timeInterval = null
    } else {
      timeInterval = setInterval(setCurrentTime, 100)
    }
  }

  // Check localStorage and display stored data
  Object.keys(times).forEach((event) => {
    const storedTimes = localStorage.getItem(event)
    if (storedTimes) {
      times[event] = JSON.parse(storedTimes)
      displayResults()
    }
  })

  // Event listener for the toggle button
  const toggleButton = document.getElementById('toggle-time-btn')
  toggleButton.addEventListener('click', () => {
    toggleCurrentTime()
    toggleButton.textContent = timeInterval ? 'หยุดปรับปรุง' : 'เริ่มปรับปรุง'
  })
})

let selectedEvent = null
const maxEvents = 3 // จำนวนรายการสูงสุดที่อนุญาตต่ออัตรา

const times = {
  Stadium: [],
  Casino: [],
  Athena: [],
}

function selectEvent(eventName) {
  selectedEvent = eventName
  document.querySelectorAll('.button-group button').forEach((button) => {
    button.classList.remove('active')
  })
  document.getElementById(`button-${eventName}`).classList.add('active')
}

function addTime() {
  if (!selectedEvent) {
    alert('กรุณาเลือกเหตุการณ์')
    return
  }
  const customTimeInputValue = document
    .getElementById('custom-time')
    .value.trim()

  if (!customTimeInputValue.match(/^\d{1,2}:\d{2}:\d{2}$/)) {
    alert('รูปแบบเวลาไม่ถูกต้อง (hh:mm:ss)')
    return
  }

  const [inputHours, inputMinutes, inputSeconds] = customTimeInputValue
    .split(':')
    .map(Number)
  const customTime = new Date()
  customTime.setHours(inputHours, inputMinutes, inputSeconds || 0, 0)
  customTime.setMinutes(customTime.getMinutes() + 45)

  const hours = String(customTime.getHours()).padStart(2, '0')
  const minutes = String(customTime.getMinutes()).padStart(2, '0')
  const seconds = String(customTime.getSeconds()).padStart(2, '0')
  const formattedTime = `${hours}:${minutes}:${seconds}`

  if (times[selectedEvent].length >= maxEvents) {
    alert(`คุณไม่สามารถเพิ่มเวลาเพิ่มเติมได้เพราะ ${selectedEvent} เต็มแล้ว`)
    return
  }

  times[selectedEvent].push(formattedTime)

  // Store data in localStorage
  localStorage.setItem(selectedEvent, JSON.stringify(times[selectedEvent]))

  // Update data to GitHub Gist (if applicable)

  displayResults()
}

function resetConfirmation() {
  const confirmation = confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลทั้งหมด?')
  if (confirmation) {
    localStorage.clear()
    Object.keys(times).forEach((event) => (times[event] = []))

    // Update data to GitHub Gist (if applicable)

    displayResults()
    alert('ลบข้อมูลเรียบร้อยแล้ว')
  }
}

function deleteTime(eventName, index) {
  times[eventName].splice(index, 1)
  localStorage.setItem(eventName, JSON.stringify(times[eventName]))

  // Update data to GitHub Gist (if applicable)

  displayResults()
}

function displayResults() {
  for (const event of Object.keys(times)) {
    const resultDiv = document.getElementById(`result-${event}`)
    resultDiv.innerHTML = `<strong>${event}</strong>`

    // Find closest time
    let closestTimeIndex = -1
    let closestTimeDifference = Infinity
    const now = new Date()
    const currentTime = now.getTime()

    times[event].forEach((time, index) => {
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const eventTime = new Date()
      eventTime.setHours(hours, minutes, seconds || 0, 0)
      const eventTimeDifference = Math.abs(eventTime.getTime() - currentTime)

      if (eventTimeDifference < closestTimeDifference) {
        closestTimeDifference = eventTimeDifference
        closestTimeIndex = index
      }

      const timeItem = document.createElement('div')
      timeItem.classList.add('result-item')
      if (index === closestTimeIndex) {
        timeItem.classList.add('closest') // Add 'closest' class for the closest time
      }
      timeItem.innerHTML = `${time} <button onclick="deleteTime('${event}', ${index})">𝗗𝗘𝗟𝗘𝗧𝗘</button>`
      resultDiv.appendChild(timeItem)
    })
  }
}
