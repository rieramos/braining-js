/*
how to
tap the button pointing the same direction as the row in the center of screen. ignore the other arrows

skills
attention to details, speed, and ability to ignore competing information

From: Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

//funcs (unralted)
function log(message) { debug && console.log("[braining][main] " + message); }
function warn(message) { debug && console.warn("[braining][main] " + message); }

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

        })(); log('canvas size: ' + Math.floor(size));
        
        canvas.setAttribute('width',size); canvas.setAttribute('height',size); return size

    }; let difficulty = 5 //temporary cells box n
    
    const element = canvaSize() / difficulty; log('icons size: ' + element + 'px');

    game.font = element + 'px Verdana' ; game.textAlign = 'end';

    function assignIcons(n) { log(maps[n])
        
        const map = maps[n].match(/[AX\-]+/g)
                           .map(a=>a.split(""));

        if (debug) {
            for (let i = 0; i < difficulty; ++i) { const arr = map[i]; log('map[' + i + ']: ' + arr) }
            for (const wildcard in wildcards) { log('wildcards[' + wildcard + ']: ' + wildcards['X']) }; log("wildcards[-]: ")
        };

        map.forEach((n, x) => {
            n.forEach((symbol, y) => { item=symbols[wildcards[symbol]]

                typeof item === 'undefined' && ( item = ' ');

                game.fillText(item, [element * (y + 1)], [element * (x + 1)])
            });
        })
    }; assignIcons(Math.floor(Math.random()*maps.length));
};

function main() { 
    canvasInterface();
    //other
};

document.addEventListener("keydown", function( event ) {
    log( event.type + ": " +  event.which );
});