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
    function canvasInterfaceIcons() { const elementsSize = canvasSize / 5;

        log('canvas size: ' + canvasSize + ' | icons size: ' + elementsSize);

        game.font = elementsSize + 'px Verdana';
        game.textAlign = 'end';
    
        //Cox, T (2022) Taller Práctico de JavaScript: ¡Crea tu Primer Videojuego! [Source code]. http://www.platzi.com
            const map = maps[0] 
                        .match(/[IXO\-]+/g) // get all ocurrencies that start with (I, X, O, '-')
                        .map(a=>a.split("")) // split all basically xD

        log(map[0][0]);

        for (let y = 1; y < 6; y++) { log('y axis: ' + y);
            for (let x = 1; x < 6; x++) { log('x axis: ' + x);
                game.fillText(arrows['up'],elementsSize * x, elementsSize * y);
            }
        }; log(maps)
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