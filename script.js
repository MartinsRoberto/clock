const menu = document.querySelector('.menu')

menu.addEventListener('click', (e) => {
  const text = e.target.innerText

  if (document.querySelector('.stopwatch')) { document.querySelector('.stopwatch').remove() }
  if (document.querySelector('.timer')) { document.querySelector('.timer').remove() }
  if (document.querySelector('.time')) { document.querySelector('.time').remove() }
  
  clearInterval(stopInterval)
  clearInterval(timerInterval)
  clearInterval(timeInterval)
  
  if (text === 'Stopwatch') {
    stopwatch()
  }
  else if (text === 'Timer') {
    timer()
  }
  else if (text === 'Time') {
    timeInterval = setInterval(time, 1000)
  }
})

let stopInterval
let timerInterval
let timeInterval = setInterval(time, 1000)

function time() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date();
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  const element = `
  <div class="time">
    <div class="box">
      <div class="row">
        <div class="hour">${hour}</div>
        <span>:</span>
        <div class="min">${min}</div>
        <span>:</span>
        <div class="sec">${sec}</div>
      </div>
      <div class="row">
        <div class="hour">${day}</div>
        <span>/</span>
        <div class="min">${month}</div>
        <span>/</span>
        <div class="sec">${year}</div>
      </div>
    </div>
  </div>
  `

  document.querySelector('.container').innerHTML = (element)

  document.querySelector('.time').style.display = 'block'

}

function stopwatch() {
  const element = `
    <div class="stopwatch">
    <div class="box">
      <div class="numbers">
        <span class="minutes">00</span>
        <span>:</span>
        <span class="seconds">00</span>
        <span>:</span>
        <span class="milli">00</span>
      </div>
      <div class="lap-info">
        <table>
          <tr class="table-header">
            <th>Lap</th>
            <th>Lap times</th>
            <th>Overall time</th>
          </tr>
        </table>
      </div>
      <div class="btns">
        <button class="lap">Lap</button>
        <button class="start">Start</button>
        <button class="pause">Pause</button>
        <button class="reset">Reset</button>
        <button class="resume">Resume</button>
      </div>
    </div>
  </div>
  `

  document.querySelector('.container').innerHTML += (element)

  document.querySelector('.stopwatch').style.display = 'block'

  const milli = document.querySelector('.stopwatch .milli')
  const sec = document.querySelector('.stopwatch .seconds')
  const min = document.querySelector('.stopwatch .minutes')

  let milliNum = 0
  let secNum = 0
  let minNum = 0
  let resumeValue = true

  let lapNumber = 1
  let timePrevious = 0


  const start = document.querySelector('.stopwatch .start')
  const lap = document.querySelector('.stopwatch .lap')
  const resume = document.querySelector('.stopwatch .resume')
  const reset = document.querySelector('.stopwatch .reset')
  const pause = document.querySelector('.stopwatch .pause')

  start.addEventListener('click', startStopwatch)

  pause.addEventListener('click', pauseStopwatch)

  resume.addEventListener('click', resumeStopwatch)

  reset.addEventListener('click', resetStopwatch)

  lap.addEventListener('click', lapStopwatch)

  startStopwatch()
  pauseStopwatch()
  resetStopwatch()

  function lapStopwatch() {

    // atual
    let milliCurrent = Number(milli.innerText)
    let secCurrent = Number(sec.innerText)
    let minCurrent = Number(min.innerText)
    let timeCurrent = milliCurrent + secCurrent * 1000 + minCurrent * 60000

    let dif = timeCurrent - timePrevious

    let conversaoMinutos = Math.floor(dif / 60000)
    let conversaoSegundos = Math.floor((dif % 60000) / 1000)
    let conversaoMili = (dif - conversaoMinutos * 60000 - conversaoSegundos * 1000)

    if (milliCurrent < 10) {
      milliCurrent = '0' + milliCurrent
    }
    if (secCurrent < 10) {
      secCurrent = '0' + secCurrent
    }
    if (minCurrent < 10) {
      minCurrent = '0' + minCurrent
    }
    if (conversaoMinutos < 10) {
      conversaoMinutos = '0' + conversaoMinutos
    }
    if (conversaoSegundos < 10) {
      conversaoSegundos = '0' + conversaoSegundos
    }
    if (conversaoMili < 10) {
      conversaoMili = '0' + conversaoMili
    }

    if (conversaoMili >= 100) {
      conversaoMili = Math.round(conversaoMili / 10)
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
    lap.style.display = 'inline-block'
    resume.style.display = 'none'
    reset.style.display = 'none'
    pause.style.display = 'inline-block'

    clearInterval(stopInterval)

    stopInterval = setInterval(() => {
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
    start.style.display = 'none'
    lap.style.display = 'none'
    resume.style.display = 'inline-block'
    reset.style.display = 'inline-block'
    pause.style.display = 'none'

    resumeValue = false
  }

  function resetStopwatch() {
    start.style.display = 'inline-block'
    lap.style.display = 'none'
    resume.style.display = 'none'
    reset.style.display = 'none'
    pause.style.display = 'none'

    clearInterval(stopInterval)
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
}

function timer() {
  const element = `
  <div class="timer">
    <div class="box">

      <div class="timer-values">
        <input class="input-min" type="number" value="10">
        <span>:</span>
        <input class="input-sec" type="number" value="10">
        <span>:</span>
        <input class="input-milli" type="number" value="10">
      </div>

      <div class="screen"></div>

      <div class="btns">
        <button class="start">Start</button>
        <button class="reset">Reset</button>
        <button class="pause">Pause</button>
        <button class="resume">Resume</button>
      </div>

    </div>
  </div>
  `

  document.querySelector('.container').innerHTML += (element)

  document.querySelector('.timer').style.display = 'block'

  const start = document.querySelector('.timer .start')
  const resume = document.querySelector('.timer .resume')
  const reset = document.querySelector('.timer .reset')
  const pause = document.querySelector('.timer .pause')

  start.addEventListener('click', startTimer)

  pause.addEventListener('click', pauseTimer)

  resume.addEventListener('click', resumeTimer)

  reset.addEventListener('click', resetTimer)

  let milliInitial
  let secInitial
  let minInitial
  let time

  function startTimer() {
    start.style.display = 'none'
    resume.style.display = 'none'
    reset.style.display = 'inline-block'
    pause.style.display = 'inline-block'

    milliInitial = Number(document.querySelector('.timer .input-milli').value)
    secInitial = Number(document.querySelector('.timer .input-sec').value)
    minInitial = Number(document.querySelector('.timer .input-min').value)

    time = milliInitial + secInitial * 1000 + minInitial * 60000

    timerInterval = setInterval(updateCountdown, 10);
  }



  function updateCountdown() {
    let minutes = parseInt(time / 60000, 10)
    let seconds = parseInt((time % 60000) / 1000, 10)
    let milli = time - (minutes * 60000 + seconds * 1000)

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milli = milli < 10 ? "00" + milli : milli;
    milli = milli < 100 ? "0" + milli : milli;


    document.querySelector('.timer .input-min').value = minutes
    document.querySelector('.timer .input-sec').value = seconds
    document.querySelector('.timer .input-milli').value = milli

    time -= 10;

    if (time < 0) {
      resetTimer()
    }
  }

  function pauseTimer() {
    start.style.display = 'none'
    resume.style.display = 'inline-block'
    reset.style.display = 'inline-block'
    pause.style.display = 'none'
    clearInterval(timerInterval);
  }

  function resumeTimer() {
    start.style.display = 'none'
    resume.style.display = 'none'
    reset.style.display = 'inline-block'
    pause.style.display = 'inline-block'

    startTimer()
  }

  function resetTimer() {
    start.style.display = 'inline-block'
    resume.style.display = 'none'
    reset.style.display = 'none'
    pause.style.display = 'none'

    clearInterval(timerInterval);

    document.querySelector('.timer .input-milli').value = '00'
    document.querySelector('.timer .input-sec').value = '00'
    document.querySelector('.timer .input-min').value = '00'
  }
}

