const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

function log(message) { console.log("[braining] " + message); }
function warn(message) { console.warn("[braining] " + message); }

window.addEventListener('load', startGame)

function startGame() {

    let canvasSize;

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    const elementsSize = canvasSize / 9;

    log('canvas size: ' + canvasSize + ' | icons size: ' + elementsSize);

	game.fillText(arrows['up'],100,100);
}