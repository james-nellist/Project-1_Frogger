function init() {
  // elements: start button, grid, lives, current score, high score, reset button
  const startButton = document.querySelector('.startBtn')
  const resetButton = document.querySelector('.resetBtn')
  const grid = document.querySelector('.grid')
  const lifeCount = document.querySelector('.lives')
  const currentScore = document.querySelector('.currentScore')
  const width = 10
  const cellCount = width * width
  const startingPosition = 95
  let currentPosition = startingPosition
  const cells = []
  const obstacle1 = createObstacle([70, 72, 76, 79], 'black', 800)
  const obstacle2 = createObstacle([50, 52, 53, 56, 57, 59], 'black', 500)
  const obstacle3 = createObstacle([10, 11, 12, 16, 17, 18, 19], 'black', 300)
  const obstacle4 = createObstacle([20, 21, 22, 26, 27, 28, 29], 'black', 500)
  const intervals = []
  const nom = document.querySelector('#nom')
  const hiss = document.querySelector('#hiss')
  const aww = document.querySelector('#aww')
  const win = document.querySelector('#win')
  const music = document.querySelector('#music')

  let lives = 3
  let alert
  let gameStarted = false
  let score = 5

  lifeCount.innerHTML = '❤️'.repeat(lives)



  function createGrid() {
    let row = document.createElement('div')
    row.classList.add('row')
    let rowNumber = 0
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      // cell.innerText = i
      cell.dataset.index = i
      if (obstacle1.position.includes(i)) {
        cell.classList.add(obstacle1.color)
      }
      if (obstacle2.position.includes(i)) {
        cell.classList.add(obstacle2.color)
      }
      if (obstacle3.position.includes(i)) {
        cell.classList.add(obstacle3.color)
      }
      if (obstacle4.position.includes(i)) {
        cell.classList.add(obstacle4.color)
      }
      cells.push(cell)
      row.appendChild(cell)
      if (row.childElementCount === width) {
        row.dataset.index = rowNumber
        row.dataset.testValue = 6
        if (rowNumber === 0) {
          row.classList.add('finish')
        } else if (rowNumber === width - 1) {
          row.classList.add('start')
        }
        grid.appendChild(row)
        rowNumber++
        row = document.createElement('div')
        row.classList.add('row')
      }
    }
    addFrog(startingPosition)
    addFly()
    addFly()
    addFly()
    addFly()
    addFly()
  }

  function begin() {
    intervals.push(setInterval(() => {
      moveObstacle(obstacle3)
    }, obstacle3.time))
    intervals.push(setInterval(() => {
      moveObstacle(obstacle2)
    }, obstacle2.time))
    intervals.push(setInterval(() => {
      moveObstacle(obstacle1)
    }, obstacle1.time))
    intervals.push(setInterval(() => {
      moveObstacle(obstacle4)
    }, obstacle4.time))
    gameStarted = true
    score = 5
    music.src = '../Project-1_Frogger/images/320806__ajubamusic__steel-drums-90bpm-key-of-a.mp3'
    music.play()
  }

  function createObstacle(position, color, time) {
    const obstacle = {
      position: position,
      color: color,
      time: time,
    }
    return obstacle
  }

  function addFrog(position) {
    cells[position].classList.add('frog')
  }

  function addFly() {
    const random = Math.floor(Math.random() * ((width * width) - width)) + width
    // cells[random].classList.add('fly')
    if (cells[random].classList.contains('fly')){
      addFly()
    } else cells[random].classList.add('fly')
  }

  function checkFrog(position) {
    const rowPosition = cells[position].parentElement
    if (rowPosition.dataset.index === '0') {
      win.src = '../Project-1_Frogger/images/189795__magixmusic__frogs-forever.mp3'
      win.play()
      alert = setTimeout(() => {
        window.alert('Woop Woop :) You are the winner!')
        gameStarted = false

        intervals.forEach(interval => {
          clearInterval(interval)
        })
      }, 100)
    }

    if (cells[position].classList.contains('black')) {
      lifeLost()
    }
    if (cells[position].classList.contains('fly')){
      scoreUp()
      removeFly(position)
    }
  }

  function removeFly(position){
    cells[position].classList.remove('fly')
  }
  function clearFly (){
    cells.forEach(cell => {
      if (cell.classList.contains('fly')){
        cell.classList.remove('fly')
      }
    })
  }


  function removeFrog() {
    cells[currentPosition].classList.remove('frog')
  }

  function lifeLost() {
    lives -= 1
    if (lives <= 0) {
      lives = 0
    }
    lifeCount.innerHTML = '❤️'.repeat(lives)
    if (lives === 0) {
      brokenHeart()
      gameOver()
    }
    hiss.src = '../Project-1_Frogger/images/447636__crownieyt__his_hissing_cat_snake.wav'
    hiss.play()
  }

  function scoreUp(){
    score -= 1
    currentScore.innerHTML = '🕷'.repeat(score)
    nom.src = '../Project-1_Frogger/images/543386__thedragonsspark__nom-noise.wav'
    nom.play()
  }

  function gameOver() {
    alert = setTimeout(() => {
      if (lifeCount.innerHTML === '💔') {
        window.alert('Game over :( Hit reset to try again!')
        gameStarted = false
      }
      intervals.forEach(interval => {
        clearInterval(interval)
      })
      gameStarted = false
    }
    , 100)
    aww.src = '../Project-1_Frogger/images/124996__phmiller42__aww.wav'
    aww.play()
  }

  function brokenHeart() {
    lifeCount.innerHTML = '💔'
  }

  function moveFrog(e) {

    if (gameStarted) {

      console.log(e)
      const right = 39
      const left = 37
      const up = 38
      const down = 40


      removeFrog()

      if (e.keyCode === right && currentPosition % width !== width - 1) {
        console.log('right')
        currentPosition++
      } else if (e.keyCode === left && currentPosition % width !== 0) {
        console.log('left')
        currentPosition--
      } else if (e.keyCode === up && currentPosition >= width) {
        console.log('up')
        currentPosition -= width
      } else if (e.keyCode === down && currentPosition + width < cellCount) {
        console.log('down')
        currentPosition += width
      } else {
        console.log('Key Invalid')
      }
      console.log(currentPosition % width)
      addFrog(currentPosition)
      checkFrog(currentPosition)
    }
  }

  function reset() {
    lives = 3
    lifeCount.innerHTML = '❤️'.repeat(lives)
    score = 5
    currentScore.innerHTML = '🕷'.repeat(score)
    removeFrog()
    currentPosition = startingPosition
    addFrog(currentPosition)
    clearFly()
    addFly()
    addFly()
    addFly()
    addFly()
    addFly()
    win.src = '../Project-1_Frogger/images/189795__magixmusic__frogs-forever.mp3'
    win.stop()
  }

  function moveObstacle(obstacle) {
    obstacle.position.forEach((cell) => cells[cell].classList.remove('black'))
    const updated = obstacle.position.map(position => (position + 1) % width === 0 ? position - width + 1 : position + 1)
    obstacle.position = updated
    obstacle.position.forEach((cell) => cells[cell].classList.add('black'))
    obstacle.position.forEach((cell) => cells[cell].classList.contains('frog') ? lifeLost() : obstacle)
    // obstacle.position.forEach((cell) => cells[cell].classList.contains('fly') ? removeFly(cell) : obstacle)
  }

  startButton.addEventListener('click', begin)
  resetButton.addEventListener('click', reset)
  document.addEventListener('keydown', moveFrog)
  createGrid()
}


window.addEventListener('DOMContentLoaded', init)


// MVP
// a grid with a frog that can move but not go offside
// reaching other side of grid = win
//  hitting obstacle = lose

// variables: let highscore, score, lives, timer(1 per obstacle?), staring position of frog, current position of frog, position of obstacles, postion of start, position of end

// on pageload: lives 3, highscore 0 or stored local storage, score 0, generate grid, frog in grid position

// execution: aiming to have main functions filled with other smaller predefined functions
// function to create grid on load, add index and append
// set grid as an array
// funtion to start:
// clear results, lives 3, score 0, frog on start, obstacle functions begin (they start to move)

// function to move frog (classlist.add)
// function to move frog based on keyboard numbers
// function to remove frog from previous position when it moves
// function to have objects move similarly to frog but based on timer instead of keys ie setInterval() => {((function to move obstacle),1000)}
// on start -> frog is able to move, obstacle timers start, obstacles move
// scoring function
// if frog makes it to other side of board -> score goes up by 100. (could have tiles that increase score with contact)

// function to reduce lives
//  if frog hits obstacle -> lose a life and go back to the start
// if lives reach 0 -> alert game over

// contains class obstacle

// if obstacle hit side, either moves back the way it came or goes back to first tile on same row
// if highscore < score = update hightscore
// reset button: clears score, sets lives to 3, places obstacles in start position


// events: start button, key buttons to move frog, reset button