const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountDown




// Set Date Input Minimum With Todays Date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// populate countdown ui elements with form info
function UpdateDom() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now

        // calculate the days hours seconds + minutes
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        // hide input container
        inputContainer.hidden = true

        // if the countdown is ended show complete el
        if(distance < 0){
            countdownEl.hidden = true
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false 
        } else {
            //show the countdown
            // populate the countdown element
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`

            completeEl.hidden = true
        
            //show countdown element
            countdownEl.hidden = false
        }

        
    }, second)
}

// reset all values
function reset() {
    // Hide countdown + show input
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false
    
    // Stop the countdown
    clearInterval(countdownActive)

    // Reset all values
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')

}

// Populate the countdown with the info from the form
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value

    savedCountDown = {
        title: countdownTitle,
        date: countdownDate,
    }

    // Save countdown to local storage
    localStorage.setItem('countdown', JSON.stringify(savedCountDown))

    // Check for valid input
    if(countdownDate === '') {
        alert('Please select a date for the countdown')
    } else {
        // Get numbered versio of current date + update DOM
        countdownValue = new Date(countdownDate).getTime()
        // console.log(countdownValue)
        UpdateDom()
    }
    
}

// Get values from localstorage on project startup
function restorePreviousCountdown(){
    // Get countdown from localStorage
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true

        savedCountDown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountDown.title
        countdownDate = savedCountDown.date
        countdownValue = new Date(countdownDate).getTime()
        UpdateDom()
    }
}

// Event Listners
// Input form submit event
countdownForm.addEventListener('submit', updateCountdown)
// reset countdown
countdownBtn.addEventListener('click', reset)
// return to countdown input form from complete element
completeBtn.addEventListener('click', reset)

// On load check local storage
restorePreviousCountdown()
