'use strict'

// activePlayer false or true <=> player1 or player 2
let activePlayer = 0,
  inactivePlayer = 1,
  currentScore = 0,
  heldScores = [0, 0],
  win = false

// selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
let activePlayerScoreEl
let activePlayerCurrentEl = document.getElementById(`current--${activePlayer}`)
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

resetGame()

function resetGame() {
  activePlayerCurrentEl.textContent = 0
  activePlayer = 0
  inactivePlayer = 1
  currentScore = 0
  heldScores = [0, 0]
  displayHeldScores()
  win = false
  diceEl.classList.add('hidden')
  btnRoll.classList.remove('hidden'), btnHold.classList.remove('hidden')
  player0El.classList.add('player--active')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--active', 'player--winner')
}

function displayHeldScores() {
  const heldScoreEls = document.querySelectorAll('.score')
  console.log(heldScoreEls)
  console.log(heldScores)
  for (let i = 0; i < heldScores.length; i++)
    heldScoreEls[i].textContent = heldScores[i]
}

// Dealing with when player clicks to roll
btnRoll.addEventListener('click', function () {
  let diceRoll = Math.floor(Math.random() * 6) + 1
  if (diceRoll === 1) currentScore = 0
  else currentScore += diceRoll
  diceEl.src = `dice-${diceRoll}.png`
  diceEl.classList.remove('hidden')
  activePlayerCurrentEl.textContent = currentScore
  // Check for rolled 1: if true, switch to next player
  if (diceRoll === 1) {
    toggleActivePlayer()
  }
})

// Dealing with when player clicks to hold their current score
btnHold.addEventListener('click', function () {
  heldScores[activePlayer] += currentScore
  currentScore = 0
  activePlayerCurrentEl.textContent = currentScore
  displayHeldScores()
  if (heldScores[activePlayer] >= 100) {
    win = true
    diceEl.classList.add('hidden')
    btnRoll.classList.add('hidden'), btnHold.classList.add('hidden')
    activePlayerCurrentEl = document.querySelector(`.player--${activePlayer}`)
    activePlayerCurrentEl.classList.add('player--winner')
    // if there isn't a win, switch to next player
  } else {
    toggleActivePlayer()
  }
})

// Dealing with when player clicks to start a new game
btnNew.addEventListener('click', function () {
  resetGame()
})

function toggleActivePlayer() {
  ;[activePlayer, inactivePlayer] = [inactivePlayer, activePlayer]
  // Remove currently active class from previously active player
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
  activePlayerCurrentEl = document.getElementById(`current--${activePlayer}`)
}
