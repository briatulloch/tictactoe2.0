// player factory function
const createPlayer = (name, marker) => {
    return {name, marker};
}

function startGame() {

// gameboard object
const gameBoard = (() => {

    //board array
    let board = [];
    for (i = 0; i < 9; i++) {
        board.push('');
    }

    // display square for each cell
    let cells = document.querySelector('.cells');

    board.forEach((item, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cells.appendChild(cell);
    })

    // add event listeners to squares
    Array.from(cells.children).forEach((cell, index) => {
        cell.addEventListener('click', () => {
            // display active player marker
            cell.classList.add(game.currentPlayer.marker);
            cell.setAttribute('data', game.currentPlayer.marker);
            // update array value to be that of active player
            board[index] = game.currentPlayer.marker;
            // remove event listener from the marked index
            cell.style.pointerEvents = 'none';
            // update remaining spots
            game.remainingSpots -= 1;
            // check winner: if all 3 values are equal for any condition
            game.handleWin();
            // check remaining spots
            if (game.winner == false) {
                if (game.remainingSpots > 0) {
                    game.switchPlayer();
                } else if (game.remainingSpots == 0) {
                    game.handleTie();
                }
            }
        })
    });


    // return
    return {
        board
    };
})();

// game object
const game = (() => {
    // players
    const playerOne = createPlayer('Player 1', 'x');
    const playerTwo = createPlayer('Player 2', 'o');

    // start
    let currentPlayer = playerOne;
    let winner = false;
    let remainingSpots = 9;

    // selectors
    let gameStatus = document.querySelector('.game-status'); // display winner/tie
    let playerName = document.querySelector('.player-name'); // alert player turn

    // winning cell combinations
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // check winner
    function handleWin() {
        winningCombos.forEach((item, index) => { 
            if (gameBoard.board[item[0]] === this.currentPlayer.marker && gameBoard.board[item[1]] === this.currentPlayer.marker && gameBoard.board[item[2]] === this.currentPlayer.marker) {
                gameStatus.innerHTML = `<b>Yay! ${this.currentPlayer.name} wins!</b>`;
                this.winner = true;
            } 
        })
        };
    

    // switch player
    function switchPlayer() {
        //switches text alert in subtext
        this.currentPlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
        //switches actual game logic (x then o etc.)
        this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
    }

    // determine tie
    function handleTie() {
        gameStatus.innerHTML = "<b>It's a tie!😯</b>";
    }

    // return
    return {
        currentPlayer,
        remainingSpots,
        handleWin,
        switchPlayer,
        handleTie,
        winner
    };
})();
}

startGame();

function cleanUp() {
    document.querySelector('.game-status').innerHTML = `<span class="player-name">Player 1</span>, you're up!`;
    document.querySelector('.cells').innerHTML = '';
};

function handleReset(){
    document.querySelector('#reset').addEventListener('click', function(){
     cleanUp();
     startGame();
    });
   
}

handleReset();



