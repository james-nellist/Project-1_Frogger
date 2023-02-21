function init(){
  // elements: start button, grid, lives, current score, high score, reset button
  const grid = document.querySelector('.grid')
  const width = 15
  const cellCount = width * width
  const startingPosition = 95
  let currentPosition = startingPosition
  const cells = []
  const obstacle1 = createObstacle([73,74], 'black', 5000)
  const obstacle2 = createObstacle([53, 55], 'black', 900)


  setInterval(() => {
    moveObstacle(obstacle2)
  }, obstacle2.time)
  setInterval(() => {
    moveObstacle(obstacle1)
  }, obstacle1.time)



  function createGrid(){
    let row = document.createElement('div')
    row.classList.add('row')
    let rowNumber = 0
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      cell.dataset.index = i
      if (obstacle1.position.includes(i)){
        cell.classList.add(obstacle1.color)
      }
      if (obstacle2.position.includes(i)){
        cell.classList.add(obstacle2.color)
      }
      cells.push(cell)
      row.appendChild(cell)
      if (row.childElementCount === width ){
        row.dataset.index = rowNumber
        row.dataset.testValue = 6
        if (rowNumber === 0){
          row.classList.add('finish')
        } else if (rowNumber === width - 1){
          row.classList.add('start')
        }
        grid.appendChild(row)
        rowNumber++
        row = document.createElement('div')
        row.classList.add('row')
      }
    }
    addFrog(startingPosition)
  }

  function createObstacle(position, color, time){

    const obstacle = {
      position: position,
      color: color,
      time: time,
    }
    return obstacle 
  }

  function addFrog(position){
    cells[position].classList.add('frog')
  }

  function checkFrog(position){
    const rowPosition = cells[position].parentElement
    if (rowPosition.dataset.index === '0'){
      window.alert('woop woop you are the winner!')
    }
    if (cells[position].classList.contains('black')){
      window.alert('fuck you')
    }
  }

  function removeFrog(){
    cells[currentPosition].classList.remove('frog')
  }

  function moveFrog(e){
    console.log(e)
    const right = 39
    const left = 37
    const up = 38
    const down = 40

    removeFrog()

    if (e.keyCode === right && currentPosition % width !== width - 1){
      console.log('right')
      currentPosition++
    } else if (e.keyCode === left && currentPosition % width !== 0){
      console.log('left')
      currentPosition --
    } else if (e.keyCode === up && currentPosition >= width){
      console.log('up')
      currentPosition -= width
    } else if (e.keyCode === down && currentPosition + width < cellCount){
      console.log('down')
      currentPosition += width
    } else {
      console.log('Key Invalid')
    }
    console.log(currentPosition % width)
    addFrog(currentPosition)
    checkFrog(currentPosition)
  }

  function moveObstacle(obstacle){
    obstacle.position.forEach((cell) => cells[cell].classList.remove('black'))
    const updated = obstacle.position.map(position => (position + 1) % width === 0 ? position - width + 1 : position + 1)
    obstacle.position = updated
    obstacle.position.forEach((cell) => cells[cell].classList.add('black'))
    obstacle.position.forEach((cell) => cells[cell].classList.contains('frog') ? window.alert('fuck you') : obstacle)
  }

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