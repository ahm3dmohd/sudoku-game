// 0 means empty


let puzzles = [
    {
        puzzle: [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ],
        solution: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]
    }, {
        puzzle: [
  [0, 8, 3, 0, 0, 7, 0, 6, 0],
  [9, 1, 0, 0, 0, 2, 7, 4, 0],
  [2, 0, 7, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 3, 0],
  [6, 5, 2, 8, 0, 0, 0, 7, 0],
  [0, 0, 4, 0, 0, 0, 5, 0, 0],
  [0, 0, 1, 0, 0, 6, 0, 0, 7],
  [8, 4, 0, 7, 0, 0, 3, 0, 0],
  [7, 2, 9, 0, 0, 0, 0, 0, 6],
],
solution: [
  [4, 8, 3, 9, 5, 7, 2, 6, 1],
  [9, 1, 5, 3, 6, 2, 7, 4, 8],
  [2, 6, 7, 1, 8, 4, 9, 5, 3],
  [1, 9, 8, 4, 7, 5, 6, 3, 2],
  [6, 5, 2, 8, 9, 3, 1, 7, 4],
  [3, 7, 4, 6, 2, 1, 5, 8, 9],
  [5, 3, 1, 2, 4, 6, 8, 9, 7],
  [8, 4, 6, 7, 1, 9, 3, 2, 5],
  [7, 2, 9, 5, 3, 8, 4, 1, 6],
],
    } , {
        puzzle: [
  [9, 4, 0, 1, 6, 8, 0, 0, 0],
  [7, 5, 0, 2, 3, 0, 0, 6, 9],
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 7, 0, 0, 0, 0, 6],
  [3, 0, 7, 4, 9, 0, 5, 0, 0],
  [8, 2, 4, 3, 5, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 1, 0, 0, 0, 0],
  [0, 7, 0, 0, 0, 9, 6, 0, 0],
],
solution: [
  [9, 4, 3, 1, 6, 8, 2, 5, 7],
  [7, 5, 1, 2, 3, 4, 8, 6, 9],
  [2, 8, 6, 9, 7, 5, 4, 1, 3],
  [5, 1, 9, 7, 8, 2, 3, 4, 6],
  [3, 6, 7, 4, 9, 1, 5, 2, 8],
  [8, 2, 4, 3, 5, 6, 9, 7, 1],
  [6, 3, 5, 8, 2, 7, 1, 9, 4],
  [4, 9, 2, 6, 1, 3, 7, 8, 5],
  [1, 7, 8, 5, 4, 9, 6, 3, 2],
],
    }
]

let puzzle;
let solution;

const checkBtn = document.getElementById("check-btn");

const board = document.getElementById("board");

const numberPad = document.getElementById("number-pad");

let selectedCell = null;

const resetBtn = document.getElementById("reset-btn");

const newGameBtn = document.getElementById("new-game-btn")

let gameInProgress = false;

const timer = document.getElementById("timer")
const tries = document.getElementById("tries")

let triesRemaining = 3;
let timeRemaining = 180;
let timerInterval = null;

const statusMessage = document.getElementById("status-message")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

numberPad.addEventListener("click", (event) => {
  const button = event.target.closest(".num-btn");

  if (!button) return;
  if (!selectedCell) return;
  if (selectedCell.classList.contains("given")) return;

  const number = button.dataset.number;

  if (number === "0") {
    selectedCell.textContent = "";
  } else {
    selectedCell.textContent = number;
  }
});

checkBtn.addEventListener("click", () => {
    checkPuzzle()
})

resetBtn.addEventListener("click", () => {
    resetPuzzle()
})

newGameBtn.addEventListener("click", () => {
    newGame()
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderBoard() {
  board.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");

      cell.classList.add("cell");

      cell.dataset.row = row;
      cell.dataset.col = col;

      const value = puzzle[row][col];

      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add("given");
      }

      if ((col + 1) % 3 === 0 && col !== 8) {
        cell.classList.add("border-right-thick");
      }

      if ((row + 1) % 3 === 0 && row !== 8) {
        cell.classList.add("border-bottom-thick");
      }

      cell.addEventListener("click", () => selectCell(cell));

      board.appendChild(cell);
    }
  }
}

function selectCell(cell) {
  if (selectedCell) {
    selectedCell.classList.remove("selected");
  }

  selectedCell = cell;
  selectedCell.classList.add("selected");
}



function checkPuzzle() {
  const cells = board.querySelectorAll(".cell");
  console.log("Check Puzzle pressed")
  const flatPuzzle = puzzle.flat()
let hasMistake = false
let isComplete = true

  cells.forEach((singleCell, index)=>{
const row = Number(singleCell.dataset.row);
    const col = Number(singleCell.dataset.col);

    const answer = solution[row][col];

    if (flatPuzzle[index]) { 
        return
    }

    if (singleCell.textContent === "") {
        isComplete = false
        return
    }
    // this checks if the cell answer is same to the solution
    if (Number(singleCell.textContent) === answer) {
      singleCell.classList.remove("invalid");
      singleCell.classList.add("correct")
    }
    // this else is if its not the same it directly has it as invalid..
    else {
        singleCell.classList.remove("correct")
      singleCell.classList.add("invalid");
      isComplete = false
      hasMistake = true
    }
  })

    if (hasMistake) {
        triesRemaining--
        updateTriesDisplay()

        if (triesRemaining <= 0) {
            endGame(false)
        }
    }

    if (isComplete) {
        endGame(true)
    }
}

function resetPuzzle() {
    const cells = board.querySelectorAll(".cell")
    console.log("Reset Puzzle pressed")

    for (const singleCell of cells) {
        if (!singleCell.classList.contains("given")) {
            singleCell.textContent = ""
            singleCell.classList.remove("correct")
            singleCell.classList.remove("invalid")
    }
}
}

function newGame() {
    console.log("New game pressed")
    const randomIndex = Math.floor(Math.random() * puzzles.length)
    if (!gameInProgress) {
        puzzle = puzzles[randomIndex].puzzle
        solution = puzzles[randomIndex].solution
        renderBoard()
        gameInProgress = true;
        timeRemaining = 180;
        triesRemaining = 3;
        updateTimerDisplay()
        updateTriesDisplay()
        clearInterval(timerInterval)
        startTimer()
    }

    else {
        const wantsNewGame = confirm("Game is already in progress are you sure you want a new game?")

        if (wantsNewGame) {
            puzzle = puzzles[randomIndex].puzzle
            solution = puzzles[randomIndex].solution
            renderBoard()
            timeRemaining = 180;
            triesRemaining = 3;
            updateTimerDisplay()
            updateTriesDisplay()
            clearInterval(timerInterval)
            startTimer()
        }
        }
}

function updateTriesDisplay() {
    tries.textContent = "Tries Remaining: "+triesRemaining
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    timer.textContent = minutes + ":" + String(seconds).padStart(2, "0")
}

function startTimer() {
    timerInterval = setInterval(() => {
       timeRemaining--
       updateTimerDisplay()
   

    if (timeRemaining <= 0) {
        endGame(false)
    }
     }, 1000)
}

function endGame(won) {
    clearInterval(timerInterval)

    if (won) {
            statusMessage.textContent = "You Win!!" 
            statusMessage.classList.remove("error")
            statusMessage.classList.add("success")
    } else {
            statusMessage.textContent = "You lose.."
            statusMessage.classList.add("error")
            statusMessage.classList.remove("success")  
    }
}






