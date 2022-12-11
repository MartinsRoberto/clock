const stopwatch = document.querySelector('.stopwatch')
const min = document.querySelector('.minutes')
const sec = document.querySelector('.seconds')
const milli = document.querySelector('.milli')

let milliNum = 0
let secNum = 0
let minNum = 0
let INTERVAL

const start = document.querySelector('.start')
const lap = document.querySelector('.lap')
const resume = document.querySelector('.resume')
const reset = document.querySelector('.reset')
const stop = document.querySelector('.stop')

start.addEventListener('click', (e) => {
    startStopwatch()

    start.style.display = 'none'
    stop.style.display = 'inline-block'
})

stop.addEventListener('click', () => {

})

function startStopwatch() {
  clearInterval(INTERVAL)
  INTERVAL = setInterval(() => {
    milliStopwatch()
  }, 10)
}

function milliStopwatch() {
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

function secStopwatch(){
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

function minStopwatch(){
  minNum++
  if (minNum < 10) {
    min.innerHTML = '0' + minNum
  } else {
    min.innerHTML = minNum
  }
}