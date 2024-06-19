document.addEventListener('DOMContentLoaded', (event) => {
  const customTimeInput = document.getElementById('custom-time')

  // Function to set current time in the input field
  function setCurrentTime() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    customTimeInput.value = `${hours}:${minutes}:${seconds}`
  }
  setCurrentTime()
  // Update current time every second
  setInterval(setCurrentTime, 1000)

  // ตรวจสอบ Session Storage และแสดงข้อมูลที่เก็บไว้
  Object.keys(times).forEach((event) => {
    const storedTimes = sessionStorage.getItem(event)
    if (storedTimes) {
      times[event] = JSON.parse(storedTimes)
      displayResults()
    }
  })
})

let selectedEvent = null
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
  const customTimeInput = document.getElementById('custom-time').value.trim()

  if (!customTimeInput.match(/^\d{1,2}:\d{2}:\d{2}$/)) {
    alert('รูปแบบเวลาไม่ถูกต้อง (hh:mm:ss)')
    return
  }

  const [inputHours, inputMinutes, inputSeconds] = customTimeInput
    .split(':')
    .map(Number)
  const customTime = new Date()
  customTime.setHours(inputHours, inputMinutes, inputSeconds || 0, 0)
  customTime.setMinutes(customTime.getMinutes() + 45)

  const hours = String(customTime.getHours()).padStart(2, '0')
  const minutes = String(customTime.getMinutes()).padStart(2, '0')
  const seconds = String(customTime.getSeconds()).padStart(2, '0')
  const formattedTime = `${hours}:${minutes}:${seconds}`

  times[selectedEvent].push(formattedTime)

  // เก็บข้อมูลใน Session Storage
  sessionStorage.setItem(selectedEvent, JSON.stringify(times[selectedEvent]))

  // อัปเดตข้อมูลไปยัง GitHub Gist

  displayResults()
}

function resetConfirmation() {
  const confirmation = confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลทั้งหมด?')
  if (confirmation) {
    sessionStorage.clear()
    Object.keys(times).forEach((event) => (times[event] = []))

    // อัปเดตข้อมูลไปยัง GitHub Gist

    displayResults()
    alert('ลบข้อมูลเรียบร้อยแล้ว')
  }
}

function deleteTime(eventName, index) {
  times[eventName].splice(index, 1)
  sessionStorage.setItem(eventName, JSON.stringify(times[eventName]))

  // อัปเดตข้อมูลไปยัง GitHub Gist

  displayResults()
}

function displayResults() {
  for (const event of Object.keys(times)) {
    const resultDiv = document.getElementById(`result-${event}`)
    resultDiv.innerHTML = `<strong>${event}</strong>`

    // หาเวลาที่ใกล้ที่สุด
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
        timeItem.classList.add('closest') // เพิ่มคลาส closest สำหรับเวลาที่ใกล้ที่สุด
      }
      timeItem.innerHTML = `${time} <span onclick="deleteTime('${event}', ${index})">X</span>`
      resultDiv.appendChild(timeItem)
    })
  }
}
