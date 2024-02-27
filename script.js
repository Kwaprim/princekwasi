let restart = document.getElementById('restart');
let board = document.getElementById('board');
let turnIndicator = document.getElementById('turnIndicator');
let winner = document.getElementById('win-indicator');
const NUM_SQUARES = 9;
let turn = Math.random() < 0.5 ? 'X' : 'O';
turnIndicator.textContent = turn + "'s Turn";

let moves = [''] * NUM_SQUARES;
let winConditions = ["","","","","","","","",""];
createGame();

function createGame() {
    for (let i = 0; i < NUM_SQUARES; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.id = "sq" + i;
        board.appendChild(square);
    }

    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (square.textContent === '') {
                square.textContent = turn;
                index = Number(square.id.slice(2));
                moves[index] = turn;
                let row = Math.floor(index / 3);
                let col = index % 3;
        
                winConditions[row] += turn;
                winConditions[col + 3] += turn;
                
                if (index == 0 || index == 4 || index == 8) {
                    winConditions[6] += turn;
                }
                if (index == 2 || index == 4 || index == 6) {
                    winConditions[7] += turn;
                }
                console.log(winConditions);
                gameOver = checkWin();

                if (gameOver) {
                    squares.forEach((square) => {
                        square.style.pointerEvents = 'none';
                    });
                }
                updateTurn();
            }
        });
    });
}

function updateTurn () {
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
    turnIndicator.textContent = turn + "'s Turn";
}

function checkWin() {
    countfull = 0;
    const squares = document.querySelectorAll('.square');
    for (let i = 0; i < winConditions.length; i++) {
        if (winConditions[i] === "XXX" || winConditions[i] === "OOO") {
            winner.textContent = turn + " Wins!";
            return true;
        } else {
            if (winConditions[i].length === 3) {
                countfull++;
            }
        }
    }
    if (countfull === 8) {
        winner.textContent = "It's a Draw!";
        return true;
    }
    return false;   
}

function clearBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.textContent = '';
    });
    moves = ["","","","","","","","",""];
}
restart.addEventListener('click', clearBoard);