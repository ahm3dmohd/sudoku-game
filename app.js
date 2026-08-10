const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]

const board = document.getElementById("board");
const numberPad = document.getElementById("number-pad");

let selectedCell = null;

function renderBoard() {
    board.innerHTML = ''

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div")

            cell.classList.add("cell")

            cell.dataset.row = row
            cell.dataset.col = col

            const value = puzzle[col][row]

            if (value !== 0) {
                cell.textContent = value
                cell.classList.add("given")
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
        selectedCell.classList.remove("selected")
    }

    selectedCell = cell
    selectedCell.classList.add("selected")
}

numberPad.addEventListener("click", (event) => {
    const button = event.target.closest(".num-btn")

    if (!button) return
    if (!selectedCell) return
    if (selectedCell.classList.contains("given")) return

    const number = button.dataset.number

    if (number === "0") {
        selectedCell.textContent = ""
    } else {
        selectedCell.textContent = number
    }
})

renderBoard()
