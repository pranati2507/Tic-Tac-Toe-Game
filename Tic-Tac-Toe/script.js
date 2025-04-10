// Initialize game variables
let board = ['', '', '', '', '', '', '', '', '']; // The game board
let currentPlayer = 'Player X'; // Starting player
let gameActive = true; // Check if the game is ongoing
const statusElement = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

// Function to handle a player's move
function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) return; // If the cell is already filled or game is over

  board[index] = currentPlayer; // Mark the board
  const cell = cells[index];
  cell.innerHTML = currentPlayer === 'Player X' ? 'X' : 'O'; // Update cell with current player's symbol

  // Check if the current player has won
  if (checkWinner()) {
    gameActive = false;
    setTimeout(() => {
      showGameOverMessage(`${currentPlayer} wins!`);
      triggerConfetti(); // Show confetti celebration
    }, 100);
  } else if (board.every(cell => cell !== '')) {
    // If board is full and no one has won, it's a draw
    gameActive = false;
    setTimeout(() => {
      showGameOverMessage("It's a Draw!");
    }, 100);
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'Player X' ? 'Player O' : 'Player X';
    statusElement.innerHTML = `${currentPlayer}'s turn`; // Update status
  }
}

// Function to check if there's a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
  });
}

// Function to display the end game message
function showGameOverMessage(message) {
  const overlay = document.getElementById('overlay');
  const endMessage = document.getElementById('endMessage');
  endMessage.textContent = message;
  overlay.style.display = 'flex';
}

// Function to trigger confetti
function triggerConfetti() {
  confetti({
    particleCount: 200,
    spread: 160,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff0', '#ff6f00', '#ff1493', '#8a2be2']
  });
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'Player X';
  gameActive = true;
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('x-hover', 'o-hover');
    cell.setAttribute('data-tooltip', `Player X's turn`); // Reset the tooltip
  });
  statusElement.innerHTML = `${currentPlayer}'s turn`;
  document.getElementById('overlay').style.display = 'none'; // Hide overlay
}

// Add event listeners for each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
  cell.addEventListener('mouseenter', () => {
    if (gameActive) {
      if (currentPlayer === 'Player X' && board[index] === '') {
        cell.classList.add('x-hover');
        cell.setAttribute('data-tooltip', `Player X's turn`);
      } else if (currentPlayer === 'Player O' && board[index] === '') {
        cell.classList.add('o-hover');
        cell.setAttribute('data-tooltip', `Player O's turn`);
      }
    }
  });
  cell.addEventListener('mouseleave', () => {
    cell.classList.remove('x-hover');
    cell.classList.remove('o-hover');
  });
});
