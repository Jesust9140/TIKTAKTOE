/*-------------------------------- Constants --------------------------------*/
//Combinations for the game
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  /*---------------------------- Variables (state) ----------------------------*/
  // creating my varaible
  let board;
  let turn;
  let winner;
  let tie;
  
  /*------------------------ Cached Element References ------------------------*/
  //Created my constant 
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.querySelector('#message');
  const resetBtnEl = document.querySelector('#reset');
  
  /*-------------------------------- Functions --------------------------------*/
  
  const placePiece = (idx) => {
    board[idx] = turn;
  };
  
  const checkForTie = () => {
    if (winner) {
      return;
    }
  
    if (!board.includes('')) {
      tie = true;
    }
  };
  
  const checkForWinner = () => {
    for (const combo of winningCombination) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
        return; // Exit early if a winner is found
      }
    }
  };
  
  const switchPlayerTurn = () => {
    if (winner) {
      return;
    }
    if (turn === 'X') {
      turn = 'O';
    } else {
      turn = 'X';
    }
  };
  
  const updateBoard = () => {
    board.forEach((cell, idx) => {
      if (cell === 'X') {
        squareEls[idx].textContent = 'X';
      } else if (cell === 'O') {
        squareEls[idx].textContent = 'O';
      } else {
        squareEls[idx].textContent = '';
      }
    });
  };



const updateMessage = () => {
    if (winner) {
        messageEl.textContent = `${winner} wins!`;
    } else if (tie) {
        messageEl.textContent = 'It\'s a tie!';
    } else {
        messageEl.textContent = `It's ${turn}'s turn`;
    }
};



  // Update messages for winning or losing
  const render = () => {
    updateBoard();
    updateMessage();
  };
  
  const handleClick = (evt) => {
    const sqIdx = evt.target.id;
    const squareIsFull = board[sqIdx] !== '';
    if (squareIsFull || winner) {
      return;
    }
  
    placePiece(sqIdx);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  };
  
  const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  };
  
  init();
  
  /*----------------------------- Event Listeners -----------------------------*/
  
  squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
  });
  resetBtnEl.addEventListener('click', init);
  