// Board Module
const gameBoard = (() => {
    const board = document.querySelector('#board');
    const cells = document.querySelectorAll('[data-cell]');

    return {
        board,
        cells
    }
})();

// Player Factory
const Player = (symbol) => {
    let mark = symbol;  
    return {
        mark
    }
};

// Game Play Module
const gamePlay = (() => {
    const cellElements = gameBoard.cells;
    const playerX = Player('x');
    const playerCircle = Player('circle');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    const winningMessageElement = document.querySelector('#winning-message');
    restartButton = document.querySelector("#restartButton");
    let circleTurn;
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // Set/Reset Board
    const setBoard = () => {
        cellElements.forEach(cell => {
            cell.removeEventListener('click', handleClick);
            cell.classList.remove(playerX.mark);
            cell.classList.remove(playerCircle.mark);
            cell.addEventListener('click', handleClick, {once: true});
        });
        gameBoard.board.classList.add(playerX.mark);
        winningMessageElement.classList.remove('show'); 
        restartButton.addEventListener('click', setBoard);
    }

    // Click Event for square clicked
    const handleClick = (e) => {
        let cell = e.target;
        const currentPlayer = circleTurn ? playerCircle.mark : playerX.mark;
        placeMark(cell, currentPlayer);
        if(checkWin(currentPlayer)) {
            endGame(false);
        } else if(isDraw()) {
            endGame(true);
        } else {
            switchPlayer(currentPlayer);
            setBoardHoverClass();
        }
    }

    //Places player mark
    const placeMark = (cell, currentPlayer) => {
        cell.classList.add(currentPlayer);
    }

    //Checks if winning combination exists after mark placed
    const checkWin = (currentPlayer) => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentPlayer)
            })
        })
    }

    // Checks if draw after mark placed
    const isDraw = () => {
        return [...cellElements].every(cell => {
            return cell.classList.contains(playerCircle.mark) || cell.classList.contains(playerX.mark);
        });
    }

    //Ends game if draw or win occurs
    const endGame = (draw) => {
        if(draw) {
            winningMessageTextElement.innerText = "It's a draw!";
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
        }
        winningMessageElement.classList.add('show');
    }

    // Switches player after each turn
    const switchPlayer = () => {
        circleTurn = !circleTurn;
    }

    //Sets new 'hover' symbol
    const setBoardHoverClass = () => {
        gameBoard.board.classList.remove(playerX.mark);
        gameBoard.board.classList.remove(playerCircle.mark);
        if(circleTurn) {
            gameBoard.board.classList.add(playerCircle.mark);
        } else {
            gameBoard.board.classList.add(playerX.mark);
        }
    }
    //Outside Accessible methods
    return {
        setBoard
    }
})();

gamePlay.setBoard();



