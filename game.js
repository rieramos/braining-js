const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

window.addEventListener('load', startGame)

function startGame() { let canvasSize = window.innerHeight * 0.75;

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
}