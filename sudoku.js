const SIZE = 6;
const BOX_ROWS = 2;
const BOX_COLS = 3;

function generateFullGrid() {
  // base valid 6x6 grid
  let base = [
    [1,2,3,4,5,6],
    [4,5,6,1,2,3],
    [2,3,4,5,6,1],
    [5,6,1,2,3,4],
    [3,4,5,6,1,2],
    [6,1,2,3,4,5]
  ];

  // shuffle rows within bands (pairs)
  for (let i = 0; i < SIZE; i += BOX_ROWS) {
    let slice = base.slice(i, i + BOX_ROWS);
    slice.sort(() => Math.random() - 0.5);
    base.splice(i, BOX_ROWS, ...slice);
  }

  // shuffle numbers
  let nums = [1,2,3,4,5,6].sort(() => Math.random() - 0.5);
  base = base.map(row => row.map(n => nums[n - 1]));

  return base;
}

function removeCells(grid,difficulty) {
    let puzzle = grid.map(row => [...row]);
    let positions = [];

    for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
        positions.push([r, c]);
    }
    }

    positions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < difficulty; i++) {
    let [r, c] = positions[i];
    puzzle[r][c] = "";
    }

  return puzzle;
}

function drawGrid(puzzle) {
  const container = document.getElementById("grid");
  container.innerHTML = "";

  puzzle.forEach((row, r) => {
    row.forEach((val, c) => {
      let input = document.createElement("input");
      input.value = val;
      input.maxLength = 1;

      if (val !== "") {
        input.disabled = true;
        input.classList.add("fixed");
      } else {
        input.addEventListener("input", handleInput);
      }

      container.appendChild(input);
    });
  });
}

function handleInput() {
  enforceRules();
  checkConflicts();
  const status = document.getElementById("status");

  if (checkWin()) {
    status.textContent = "🎉 Puzzle Solved!";
    status.style.color = "#2e7d32";
  } else {
    status.textContent = "";
  }
}

function enforceRules() {
  document.querySelectorAll("#grid input").forEach(input => {
    if (!/^[1-6]$/.test(input.value)) {
      input.value = "";
    }
  });
}

function checkConflicts() {
  const inputs = document.querySelectorAll("#grid input");
  inputs.forEach(i => i.classList.remove("conflict"));

  let grid = [];
  let index = 0;

  for (let r = 0; r < SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < SIZE; c++) {
      let val = inputs[index].value;
      grid[r][c] = val ? parseInt(val) : 0;
      index++;
    }
  }

  index = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      let val = grid[r][c];

      if (val !== 0 && hasDuplicate(grid, r, c, val)) {
        inputs[index].classList.add("conflict");
      }

      index++;
    }
  }
}

function hasDuplicate(grid, row, col, value) {
  // row
  for (let c = 0; c < SIZE; c++) {
    if (c !== col && grid[row][c] === value) return true;
  }

  // column
  for (let r = 0; r < SIZE; r++) {
    if (r !== row && grid[r][col] === value) return true;
  }

  // box (2x3)
  let startRow = Math.floor(row / BOX_ROWS) * BOX_ROWS;
  let startCol = Math.floor(col / BOX_COLS) * BOX_COLS;

  for (let r = startRow; r < startRow + BOX_ROWS; r++) {
    for (let c = startCol; c < startCol + BOX_COLS; c++) {
      if ((r !== row || c !== col) && grid[r][c] === value) {
        return true;
      }
    }
  }

  return false;
}

function generateSudoku(difficulty = 20) {
  let solution = generateFullGrid();
  let puzzle = removeCells(solution,difficulty);
  drawGrid(puzzle);
}

function checkWin() {
  const inputs = document.querySelectorAll("#grid input");

  for (let input of inputs) {
    if (input.value === "" || input.classList.contains("conflict")) {
      return false;
    }
  }

  return true;
}
generateSudoku();