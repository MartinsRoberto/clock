const stopwatch = document.querySelector('.stopwatch')
const min = document.querySelector('.minutes')
const sec = document.querySelector('.seconds')
const milli = document.querySelector('.milli')

let milliNum = 0
let secNum = 0
let minNum = 0
let INTERVAL
let resumeValue = true

const start = document.querySelector('.start')
const lap = document.querySelector('.lap')
const resume = document.querySelector('.resume')
const reset = document.querySelector('.reset')
const pause = document.querySelector('.pause')

start.addEventListener('click', (e) => {
  startStopwatch()

  start.style.display = 'none'
  pause.style.display = 'inline-block'
})

pause.addEventListener('click', () => {
  pauseStopwatch()

  resume.style.display = 'inline-block'
  reset.style.display = 'inline-block'
  pause.style.display = 'none'
  start.style.display = 'none'
  lap.style.display = 'none'
})

resume.addEventListener('click', () => {

  pause.style.display = 'inline-block'
  lap.style.display = 'inline-block'
  resume.style.display = 'none'
  reset.style.display = 'none'
  start.style.display = 'none'

  resumeValue = true
})

reset.addEventListener('click', () => {
  resetStopwatch()

  start.style.display = 'inline-block'
  lap.style.display = 'inline-block'
  resume.style.display = 'none'
  reset.style.display = 'none'
  pause.style.display = 'none'
})

// FUNCTIONS
// FUNCTIONS
// FUNCTIONS
// FUNCTIONS
// FUNCTIONS

function startStopwatch() {
  clearInterval(INTERVAL)
  INTERVAL = setInterval(() => {
    milliStopwatch()
  }, 10)
}

function pauseStopwatch() {
  resumeValue = false
}

function resetStopwatch() {
  clearInterval(INTERVAL)
  milliNum = 0
  secNum = 0
  minNum = 0

  min.innerText = '00' 
  sec.innerText = '00' 
  milli.innerText = '00' 

  resumeValue = true
}

function milliStopwatch() {
  if (resumeValue) {
    milliNum++
    if (milliNum < 10) {
      milli.innerHTML = '0' + milliNum
    } else {
      milli.innerHTML = milliNum
    }

    if (milliNum == 99) {
      milliNum = 0
      secStopwatch()
    }
  }
}

function secStopwatch() {
  secNum++
  if (secNum < 10) {
    sec.innerHTML = '0' + secNum
  } else {
    sec.innerHTML = secNum
  }

  if (secNum == 59) {
    secNum = 0
    minStopwatch()
  }
}

function minStopwatch() {
  minNum++
  if (minNum < 10) {
    min.innerHTML = '0' + minNum
  } else {
    min.innerHTML = minNum
  }
}