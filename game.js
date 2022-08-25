/*

how to
tap the button pointing the same direction as the row in the center of screen. ignore the other arrows

skills
attention to details, speed, and ability to ignore competing information

From:
	Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

//funcs (unralted)
function log(message) { console.log("[braining][main] " + message); }
function warn(message) { console.warn("[braining][main] " + message); }

//vars
canvas = document.querySelector('#game'); game = canvas.getContext('2d');

//events
window.addEventListener('load', main); window.addEventListener('resize', main);

//usage: canvasInterface
function canvasInterface(){

    //usage: canvaSize
    function canvaSize(){

        const size = (function(){ let height = window.innerHeight; let width = window.innerWidth;
            
            return height < width ? (height * 0.8) : (width * 0.8);
        })(); log('canvas size: ' + size); 
        
        canvas.setAttribute('width',size); canvas.setAttribute('height',size); return size

    }; let difficulty = 5;

    const elementSize = canvaSize() / difficulty; log('icons size: ' + elementSize);

    game.font = elementSize + 'px Verdana' ; game.textAlign = 'end';

    function assignIcons(n) {
        
        const map = maps[n].match(/[IXO\-]+/g)      // get all ocurrencies that start with (I, X, O, '-')
                           .map(a=>a.split(""));    // split all basically xD
        //↑↑↑ Cox, T (2022) Taller Práctico de JavaScript: ¡Crea tu Primer Videojuego! [Source code]. http://www.platzi.com

        log("check integrity: random 'map' item: " + map[Math.floor(Math.random() * 10)]
                                                        [Math.floor(Math.random() * 10)]

        +   " | random 'wildcard' item: " + wildcards['X']);

        for (let y = 1; y <= difficulty + 1; y++){
            for (let x = 1; x <= difficulty + 1; x++) {
            
                log((y - 1) + ' (y) ' + (x - 1) + ' (x)');
                game.fillText(wildcards[map[y - 1][x - 1]], elementSize * x, elementSize * y);
            };
        };
    }; assignIcons(0);
};

function main() { 
    canvasInterface();
    //other
};
