const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

function log(message) { console.log("[braining] " + message); }
function warn(message) { console.warn("[braining] " + message); }

window.addEventListener('load', main)
window.addEventListener('resize', main)

function canvasInterface(){
    //vars
    let canvasSize;

// funcs
    //usage: canvasInterfaceIcons
    function canvasInterfaceIcons() { const elementsSize = canvasSize / 3;

        game.font = elementsSize + 'px Verdana';
        game.textAlign = 'end';
    
        for (let y = 1; y < 4; y++) { log('y axis: ' + y);
            for (let x = 1; x < 4; x++) { log('x axis: ' + x);
                game.fillText(arrows['up'],elementsSize * x, elementsSize * y);
            }
        }

        log('canvas size: ' + canvasSize + ' | icons size: ' + elementsSize);
    }

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    // set canvas composition
    canvas.setAttribute('width',canvasSize); canvas.setAttribute('height',canvasSize);

    // set icons
    canvasInterfaceIcons();
}

function main(){ 
    canvasInterface();
}