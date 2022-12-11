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

start.addEventListener('click', startStopwatch)

pause.addEventListener('click', pauseStopwatch)

resume.addEventListener('click', resumeStopwatch)

reset.addEventListener('click', resetStopwatch)

lap.addEventListener('click', lapStopwatch)

// FUNCTIONS
// FUNCTIONS
// FUNCTIONS
// FUNCTIONS
// FUNCTIONS

let lapNumber = 1
let timePrevious = 0

function lapStopwatch(){  

  // atual
  let milliCurrent = Number(milli.innerText)
  let secCurrent = Number(sec.innerText)
  let minCurrent = Number(min.innerText)
  let timeCurrent = milliCurrent + secCurrent*1000 + minCurrent*60000

  let dif = timeCurrent - timePrevious

  let conversaoMinutos = Math.floor(dif / 60000)
  let conversaoSegundos = Math.floor((dif % 60000) / 1000)
  let conversaoMili = (dif - conversaoMinutos*60000 - conversaoSegundos*1000)
  
  if(milliCurrent < 10) {
    milliCurrent = '0' +milliCurrent
  }
  if(secCurrent < 10) {
    secCurrent = '0' +secCurrent
  }
  if(minCurrent < 10) {
    minCurrent = '0' +minCurrent
  }
  if(conversaoMinutos < 10){
    conversaoMinutos = '0'+ conversaoMinutos
  }
  if(conversaoSegundos < 10){
    conversaoSegundos = '0'+ conversaoSegundos
  }
  if(conversaoMili < 10){
    conversaoMili = '0'+ conversaoMili
  }

  if(conversaoMili >= 100){
    conversaoMili = Math.round(conversaoMili/10)
  }

  const table = document.querySelector('.stopwatch table')

  table.innerHTML += `
    <td class="lap-number">${lapNumber}</td>
    <td class="laps-time">${conversaoMinutos}:${conversaoSegundos}:${conversaoMili}</td>
    <td class="overvall-time">${minCurrent}:${secCurrent}:${milliCurrent}</td>
  `

  timePrevious = timeCurrent
  lapNumber++
}

function startStopwatch() {
  start.style.display = 'none'
  pause.style.display = 'inline-block'
  lap.style.display = 'inline-block'

  clearInterval(INTERVAL)
  INTERVAL = setInterval(() => {
    milliStopwatch()
  }, 10)
}

function resumeStopwatch() {
  pause.style.display = 'inline-block'
  lap.style.display = 'inline-block'
  resume.style.display = 'none'
  reset.style.display = 'none'
  start.style.display = 'none'

  resumeValue = true
}

function pauseStopwatch() {
  resume.style.display = 'inline-block'
  reset.style.display = 'inline-block'
  pause.style.display = 'none'
  start.style.display = 'none'
  lap.style.display = 'none'

  resumeValue = false
}

function resetStopwatch() {
  start.style.display = 'inline-block'
  lap.style.display = 'none'
  resume.style.display = 'none'
  reset.style.display = 'none'
  pause.style.display = 'none'

  clearInterval(INTERVAL)
  milliNum = 0
  secNum = 0
  minNum = 0

  timePrevious = 0
  lapNumber = 1

  min.innerText = '00' 
  sec.innerText = '00' 
  milli.innerText = '00' 

  resumeValue = true

  const table = document.querySelector('.stopwatch table')

  table.innerHTML = 
  `<tr>
    <th>Lap</th>
    <th>Lap times</th>
    <th>Overall time</th>
  </tr>`

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