// Document Targets
const messageTop = document.getElementById('message-top')
const messageBottom = document.getElementById('message-bottom')
const cells = document.querySelectorAll('.cell')
const restartBtn = document.getElementById('restart-btn')

let boxes = []

// Win Conditions
const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let currentPlayer = ''
let gameIsActive = true

const setupGame = () => {
  currentPlayer = 'X'
  messageTop.textContent = `Current player is "${currentPlayer}"`
  messageBottom.textContent = ''
  restartBtn.style.display = 'none'
  gameIsActive = true
  boxes = ['', '', '', '', '', '', '', '', '']

  cells.forEach((cell) => {
    cell.textContent = ''
    cell.addEventListener('click', handleClick)
  })

  drawBoard()
}

const drawBoard = () => {
  cells.forEach((cell, index) => {
    // Remove top border
    if (index < 3) {
      cell.style.borderTopStyle = 'none'
    }
    // Remove left border
    if (index % 3 === 0) {
      cell.style.borderLeftStyle = 'none'
    }
    // Remove right border
    if (index % 3 === 2) {
      cell.style.borderRightStyle = 'none'
    }
    // Remove bottom border
    if (index > 5) {
      cell.style.borderBottomStyle = 'none'
    }
  })
}

const handleClick = (e) => {
  const cellId = e.target.dataset.cell
  const cellText = e.target.textContent
  if (!cellText && gameIsActive) {
    e.target.textContent = currentPlayer
    boxes[cellId] = currentPlayer
    checkWinCondition()
    changeCurrentPlayer()
  }
}

const checkWinCondition = () => {
  winLines.forEach((line) => {
    if (boxes[line[0]] === currentPlayer && boxes[line[1]] === currentPlayer && boxes[line[2]] === currentPlayer) {
      gameResults('win')
    } else if (!boxes.includes('')) {
      gameResults('draw')
    } else {
      return
    }
  })
}

const gameResults = (result) => {
  if (result === 'win') {
    messageBottom.textContent = `🎉 Player ${currentPlayer} has won! 🎉`
  } else if (result === 'draw') {
    messageBottom.textContent = `This game is a draw!`
  }
  gameIsActive = false
  restartBtn.style.display = 'block'
  restartBtn.addEventListener('click', playGame)
}

const changeCurrentPlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else {
    currentPlayer = 'X'
  }
  messageTop.textContent = `Current player is "${currentPlayer}"`
}

const playGame = () => {
  setupGame()
}

playGame()
