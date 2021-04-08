// player factory function
const createPlayer = (name, marker) => {
    return {name, marker};
}

// gameboard object
const gameBoard = (() => {

    // generate board array
    let board = [];
    for (i = 0; i < 9; i++) {
        board.push('');
    }

    // display square for each cell
    let squares = document.querySelector('.squares');

    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    })

    // add event listeners on each square
    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            // display active player marker
            square.classList.add(game.currentPlayer.marker);
            square.setAttribute('data', game.currentPlayer.marker);
            // update array value to be that of active player
            board[index] = game.currentPlayer.marker;
            // remove event listener from the marked index
            square.style.pointerEvents = 'none';
            // update remainingSpots
            game.remainingSpots -= 1;
            // check winner: if all 3 values within any of these conditions are ===...
            game.handleWin();
            // check remaining spots
            if (game.winner == false) {
                if (game.remainingSpots > 0) {
                    game.switchPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
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
   
    // declare players
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');

    // starting point
    let currentPlayer = playerOne;
    let winner = false;
    let remainingSpots = 9;

    // selectors
    let subtext = document.querySelector('.subtext'); // display winner/tie
    let playerName = document.querySelector('.player-name'); // alert player turn

    // winning conditions
    const winningCombinations = [
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
        winningCombinations.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameBoard.board[item[0]] === this.currentPlayer.marker && gameBoard.board[item[1]] === this.currentPlayer.marker && gameBoard.board[item[2]] === this.currentPlayer.marker) {
                subtext.innerHTML = `<b>Yay! ${this.currentPlayer.name} wins!</b>`;
                this.winner = true;
            } 
        })
    }

    // alert next player
    function switchPlayer() {
        this.currentPlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    }

    // next player
    function nextPlayer() {
        this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
        
    }

    // declare tie
    function declareTie() {
        subtext.innerHTML = "<b>It's a tie!😯</b>";
    }

    // return
    return {
        currentPlayer,
        remainingSpots,
        handleWin,
        switchPlayer,
        nextPlayer,
        declareTie,
        winner
    };
})();

function handleReset(){
    document.querySelector('#reset').addEventListener('click', function(){   
     location.reload();
    });
}

handleReset();




