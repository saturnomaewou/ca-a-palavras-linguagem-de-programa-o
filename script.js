const boardElement = document.getElementById('board');
const resetButton = document.getElementById('reset');
let turn = 'X';
let boardState = Array(9).fill(null);
let gameOver = false;

// Cria as 9 células no tabuleiro
function createBoard() {
  boardElement.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove, { once: true });
    boardElement.appendChild(cell);
  }
}

// Registra um movimento
function handleMove(e) {
  const idx = +e.target.dataset.index;
  if (gameOver || boardState[idx]) return;

  boardState[idx] = turn;
  e.target.textContent = turn;

  if (checkWin(turn)) {
    alert(`Jogador ${turn} venceu!`);
    gameOver = true;
    return;
  }

  if (boardState.every(cell => cell)) {
    alert('Empate!');
    gameOver = true;
    return;
  }

  turn = turn === 'X' ? 'O' : 'X';
}

// Verifica combinações vencedoras
function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // colunas
    [0,4,8], [2,4,6]           // diagonais
  ];

  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === player)
  );
}

// Reinicia o jogo
resetButton.addEventListener('click', () => {
  turn = 'X';
  boardState = Array(9).fill(null);
  gameOver = false;
  createBoard();
});

// Inicialização
createBoard();
