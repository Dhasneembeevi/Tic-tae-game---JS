const statusDisplay = document.querySelector('.status');
let gameActive = true; // pause at end
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // current game state 
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, cellIndex) {
    gameState[cellIndex] = currentPlayer; //
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    if (currentPlayer === "X") {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}
const winningConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]; //[0, 1, 2]
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
   let roundDraw = !gameState.includes(""); // if all filled
        if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
   handlePlayerChange();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
function handleCellClick(e) {
    const clickedCell = e.target;
    console.log(clickedCell) // entire div element
    const cellIndex = parseInt(clickedCell.getAttribute('index'));
    console.log(cellIndex)
    console.log(gameActive)
    console.log(gameState)
    if (gameState[cellIndex] !== "" || gameActive == false) {
       return
    }
    handleCellPlayed(clickedCell, cellIndex);
    handleResultValidation();
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);