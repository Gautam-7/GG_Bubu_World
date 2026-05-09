const board = document.getElementById("board");
const statusText = document.getElementById("status");
const diceResult = document.getElementById("diceResult");

const rollBtn = document.getElementById("rollBtn");

let totalPlayers = 1;
let currentPlayer = 1;
let positions = {};

const snakes = {
  99: 5,
  70: 55,
  52: 42,
  26: 2,
  75: 6,
  95: 72
};

const ladders = {
  6: 25,
  11: 40,
  17: 69,
  46: 90,
  60: 85,
  33: 66
};

// Start Game
function startGame(playerCount = 1) {
  totalPlayers = parseInt(playerCount);

  positions = {};

  for (let i = 1; i <= totalPlayers; i++) {
    positions[i] = 1;
  }

  currentPlayer = 1;

  createBoard();

  statusText.innerHTML = `Player 1's Turn`;
  diceResult.innerHTML = "";

  rollBtn.disabled = false;
}

// Create Board
function createBoard() {
  board.innerHTML = "";

  let numbers = [];

  for (let row = 9; row >= 0; row--) {
    let rowNums = [];

    for (let col = 1; col <= 10; col++) {
      rowNums.push(row * 10 + col);
    }

    if ((9 - row) % 2 === 1) {
      rowNums.reverse();
    }

    numbers.push(...rowNums);
  }

  numbers.forEach(num => {
    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.id = "cell-" + num;
    cell.innerText = num;

    if (snakes[num]) {
      cell.classList.add("snake");
    }

    if (ladders[num]) {
      cell.classList.add("ladder");
    }

    board.appendChild(cell);
  });

  updatePlayers();
}

// Update Player Tokens
function updatePlayers() {
  document.querySelectorAll(".player").forEach(p => p.remove());

  for (let player in positions) {
    const pos = positions[player];
    const cell = document.getElementById("cell-" + pos);

    const piece = document.createElement("div");

    piece.classList.add("player");
    piece.classList.add("p" + player);

    cell.appendChild(piece);
  }
}

// Roll Dice
function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;

  diceResult.classList.add("dice-rolling");

setTimeout(() => {
  diceResult.innerHTML = getDiceEmoji(dice);
  diceResult.classList.remove("dice-rolling");

  if (positions[currentPlayer] === 1 && dice !== 6) {
    statusText.innerHTML = `🚫 Player ${currentPlayer} needs 6 to start`;
  } 
  else{
    let newPos = positions[currentPlayer] + dice;
    if (newPos <= 100) {
        positions[currentPlayer] = newPos;

        // Ladder
        if (ladders[newPos]) {
        positions[currentPlayer] = ladders[newPos];

        statusText.innerHTML =
            `Player ${currentPlayer} reached ${newPos} and climbed ladder to ${ladders[newPos]}`;
        }

        // Snake
        else if (snakes[newPos]) {
        positions[currentPlayer] = snakes[newPos];

        statusText.innerHTML =
            `Player ${currentPlayer} reached ${newPos} and 🐍Snake!!, slid to ${snakes[newPos]}`;
        }
    }

    updatePlayers();

    // Win Check
    if (positions[currentPlayer] === 100) {
        statusText.innerHTML =
        `🎉 Player ${currentPlayer} Wins!`;

        rollBtn.disabled = true;
        return;
    }
}
    // Next Player
    currentPlayer++;

    if (currentPlayer > totalPlayers) {
        currentPlayer = 1;
    }

    statusText.innerHTML +=
        `<br>Player ${currentPlayer}'s Turn`;
    }, 200);
    }
    

function getDiceEmoji(num) {
  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return diceFaces[num - 1];
}
// Events
rollBtn.addEventListener("click", rollDice);

// Default Start
startGame();