const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

function log(message) { console.log("[braining] " + message); }
function warn(message) { console.warn("[braining] " + message); }

window.addEventListener('load', startGame)
window.addEventListener('resize', startGame)

function startGame() {

    let canvasSize;

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    const elementsSize = canvasSize / 3;

    log('canvas size: ' + canvasSize + ' | icons size: ' + elementsSize);

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    for (let y = 1; y < 4; y++) {
        for (let x = 1; x < 4; x++) {
            game.fillText(arrows['up'],elementsSize * x, elementsSize * y);
        }
    }
}