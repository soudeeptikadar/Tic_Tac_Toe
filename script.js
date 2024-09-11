const startButton = document.getElementById('startGame');
const gameGrid = document.getElementById('gameGrid');
const gameStatus = document.getElementById('gameStatus');

let currentPlayer = 'Player 1';  // Use player names instead of X and O
let gameActive = false;
let board = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', startGame);

gameGrid.addEventListener('click', (e) => {
    if (gameActive && e.target.classList.contains('cell') && !e.target.textContent) {
        const index = e.target.getAttribute('data-index');
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer === 'Player 1' ? 'X' : 'O'; // Display X or O for players
        e.target.classList.add(currentPlayer === 'Player 1' ? 'x' : 'o');

        if (checkWin()) {
            gameStatus.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            highlightWinningCells();
        } else if (board.every(cell => cell)) {
            gameStatus.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
            gameStatus.textContent = `${currentPlayer}'s turn`;
        }
    }
});

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'Player 1';
    gameStatus.textContent = `${currentPlayer}'s turn`;

    Array.from(gameGrid.children).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '#555';  // Reset background color
    });
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function highlightWinningCells() {
    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelector(`.cell[data-index="${a}"]`).style.backgroundColor = '#0f0';
            document.querySelector(`.cell[data-index="${b}"]`).style.backgroundColor = '#0f0';
            document.querySelector(`.cell[data-index="${c}"]`).style.backgroundColor = '#0f0';
        }
    });
}
