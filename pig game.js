const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score0, score1, currentScore, activePlayer, playing;

const init = () => {
  score0 = 0;
  score1 = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = "none";
  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Roll Dice Button
btnRoll.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice${dice}.jpg`;
    diceEl.style.display = "block";

    switch (dice) {
      case 1:
        switchPlayer();
        break;
      default:
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        break;
    }
  }
});

// Hold Button
btnHold.addEventListener("click", () => {
  if (playing) {
    switch (activePlayer) {
      case 0:
        score0 += currentScore;
        score0El.textContent = score0;
        if (score0 >= 100) {
          playing = false;
          diceEl.style.display = "none";
          player0El.classList.add("winner");
          player0El.querySelector(".player--name").textContent = "Player 1 Wins!";
        } else {
          switchPlayer();
        }
        break;

      case 1:
        score1 += currentScore;
        score1El.textContent = score1;
        if (score1 >= 100) {
          playing = false;
          diceEl.style.display = "none";
          player1El.classList.add("winner");
          player1El.querySelector(".player--name").textContent = "Player 2 Wins!";
        } else {
          switchPlayer();
        }
        break;
    }
  }
});

// New Game Button
btnNew.addEventListener("click", init);