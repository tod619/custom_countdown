const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date

// Set Date Input Minimum With Todays Date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// populate countdown ui elements with form info
function UpdateDom() {
    const now = new Date().getTime()
    const distance = countdownValue - now

    // calculate the days hours seconds + minutes
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    //console.log(days, hours, minutes, seconds)

    // populate the countdown element
    countdownElTitle.textContent = `${countdownTitle}`
    timeElements[0].textContent = `${days}`
    timeElements[1].textContent = `${hours}`
    timeElements[2].textContent = `${minutes}`
    timeElements[3].textContent = `${seconds}`

    // hide input container + show countdown element
    inputContainer.hidden = true
    countdownEl.hidden = false
}

// Populate the countdown with the info from the form
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value

    // Get numbered versio of current date + update DOM
    countdownValue = new Date(countdownDate).getTime()
   // console.log(countdownValue)
    UpdateDom()

    
}

// Event Listners
// Input form submit event
countdownForm.addEventListener('submit', updateCountdown)

