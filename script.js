const elementsCell = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMensage = document.querySelector("[data-win]");
const winningMensageTxtElement = document.querySelector("[data-wmText]");
const winningMensageButton = document.querySelector("[data-wmButton]");
const veia1 = document.querySelector("[data-veiaX]");
const veia2 = document.querySelector("[data-veiaCircle]");
const veia1Draw = document.querySelector("[data-veia1Draw]");
const veia2Draw = document.querySelector("[data-veia2Draw]");

let isVeia2Turn = true;

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

const startGame = () => {
    isVeia2Turn = !isVeia2Turn;
    
    for ( const cell of elementsCell) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverVeia();
    winningMensage.classList.remove('show-winningMsg');
    veia2.classList.remove('show-winningMsg');
    veia1.classList.remove('show-winningMsg');
    veia1Draw.classList.remove('show-winningMsg');
    veia2Draw.classList.remove('show-winningMsg');
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMensageTxtElement.innerText = 'Empate!';
    } else {
        winningMensageTxtElement.innerText = isVeia2Turn ? 'Elizette Venceste!' : 'Gertrudes Venceste!';
    }

    if (winningMensageTxtElement.innerText === 'Elizette Venceste!') {
        veia2.classList.add('show-winningMsg');
    } else if (winningMensageTxtElement.innerText === 'Gertrudes Venceste!') {
        veia1.classList.add('show-winningMsg');
    } else {
        veia1Draw.classList.add('show-winningMsg');
        veia2Draw.classList.add('show-winningMsg');
    }

    winningMensage.classList.add('show-winningMsg');
}

const checkWin = (currentVeia) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return elementsCell[index].classList.contains(currentVeia);
        });
    });
}

const checkDraw = () => {
    return [...elementsCell].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

const setBoardHoverVeia = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isVeia2Turn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const changeVeia = () => {
    isVeia2Turn = !isVeia2Turn;

    setBoardHoverVeia();
}

const handleClick = (e) => {
    // adding tag
    const cell = e.target;
    const veiaTurn = isVeia2Turn ? 'circle' : 'x';

    cell.classList.add(veiaTurn);

    // victory and draw check
    const isWinner = checkWin(veiaTurn);
    
    const isDraw = checkDraw();

    if (isWinner) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // swapping players
        changeVeia();
    }
};

startGame();

winningMensageButton.addEventListener('click', startGame);