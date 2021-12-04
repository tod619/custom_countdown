const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date

// Set Date Input Minimum With Todays Date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate the countdown with the info from the form
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value

    // Get numbered versio of current date + update DOM
    countdownValue = new Date(countdownDate).getTime()
    console.log(countdownValue)

    
}

// Event Listners
// Input form submit event
countdownForm.addEventListener('submit', updateCountdown)

