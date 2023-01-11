'use strict'

// activePlayer false or true <=> player1 or player 2
let activePlayer = false
let currentScore = 0
let heldScore0 = 0
let heldScore1 = 0
let win = false

// selecting elements
const name0El = document.getElementById('name--0')
const name1El = document.getElementById('name--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const currentScore0El = document.getElementById('current--0')
const currentScore1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
let activePlayerNameEl = name0El
let activePlayerScoreEl = score0El
let activePlayerCurrentEl = currentScore0El

setCurrentPlayer()

// starting conditions
score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add('hidden')

// Dealing with when player clicks to roll
btnRoll.addEventListener('click', function () {
  let activeHeldScore = activePlayer === false ? heldScore0 : heldScore1
  // 1. Generate a random dice roll between 1 and 6
  let diceRoll = Math.floor(Math.random() * 6) + 1
  console.log(diceRoll)
  // 2. Display dice
  switch (diceRoll) {
    case 1:
      diceEl.src = 'dice-1.png'
      currentScore = 0
      break
    case 2:
      diceEl.src = 'dice-2.png'
      currentScore += 2
      break
    case 3:
      diceEl.src = 'dice-3.png'
      currentScore += 3
      break
    case 4:
      diceEl.src = 'dice-4.png'
      currentScore += 4
      break
    case 5:
      diceEl.src = 'dice-5.png'
      currentScore += 5
      break
    case 6:
      diceEl.src = 'dice-6.png'
      currentScore += 6
      break
    default:
  }
  diceEl.classList.remove('hidden')
  activePlayerCurrentEl.textContent = currentScore
  // 3. Check for win
  if (currentScore + activeHeldScore >= 100) {
    win = true
  }
  // 4. Check for rolled 1: if true, switch to next player
  if (diceRoll === 1) {
    activePlayer = !activePlayer
    setCurrentPlayer()
  }
  console.log(activePlayer)
})

// Dealing with when player clicks to hold their current score
btnHold.addEventListener('click', function () {})
// TODO

// Dealing with when player clicks to start a new game
btnNew.addEventListener('click', function () {})
// TODO

function setCurrentPlayer() {
  // Remove currently active class from previously active player
  activePlayerNameEl.classList.remove('player--active')
  activePlayerScoreEl.classList.remove('player--active')
  activePlayerCurrentEl.classList.remove('player--active')
  // Check for current player and set their elements as the active ones
  if (activePlayer === false) {
    activePlayerNameEl = name0El
    activePlayerScoreEl = score0El
    activePlayerCurrentEl = currentScore0El
  }
  if (activePlayer === true) {
    activePlayerNameEl = name1El
    activePlayerScoreEl = score1El
    activePlayerCurrentEl = currentScore1El
  }
  // Add active classes to the resulting active player elements
  activePlayerNameEl.classList.add('player--active')
  activePlayerScoreEl.classList.add('player--active')
  activePlayerCurrentEl.classList.add('player--active')
}
