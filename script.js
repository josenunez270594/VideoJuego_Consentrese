const cards = [
    { id: 1, image: 'images/img1.jpg' },
    { id: 2, image: 'images/img2.jpg' },
    { id: 3, image: 'images/img3.jpg' },
    { id: 4, image: 'images/img4.jpg' },
    { id: 5, image: 'images/img5.jpg' },
    { id: 6, image: 'images/img6.jpg' }
];

// Duplicamos las cartas para tener parejas y las mezclamos
let gameCards = [...cards, ...cards].sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');

// Inicializa el tablero de juego
function initializeGame() {
    gameBoard.innerHTML = '';
    gameCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const imgElement = document.createElement('img');
        imgElement.src = card.image;

        cardElement.appendChild(imgElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Función que maneja el giro de las cartas
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Verifica si las cartas coinciden
function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === cards.length) {
            statusText.textContent = '¡Ganaste! Has encontrado todas las parejas.';
        }
    } else {
        unflipCards();
    }
}

// Deshabilita las cartas si coinciden
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Voltea las cartas si no coinciden
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reinicia las variables para continuar el juego
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Inicializamos el juego al cargar la página
initializeGame();
