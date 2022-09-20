/*
how to
tap the button pointing the same direction as the row in the center of screen. ignore the other arrows

skills
attention to details, speed, and ability to ignore competing information

From: Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

let wildcards = { 'A':'', 'X':'', }

function log(message, section) { debug[section] === undefined && (section = 'main');

    debug[section] === true && (console.log("[braining][main] " + message));
}

function warn(message) { debug && console.warn("[braining][main] " + message); }

//vars
canvas = document.querySelector('#game'); game = canvas.getContext('2d');

//events
window.addEventListener('load', main); window.addEventListener('resize', main);

function verifiedKey(keyID){log(keyID); (+keyID === +wildcards['A']) ? main() : console.log('-')};

//usage: canvasInterface
function canvasInterface(){

    //usage: canvaSize
    function canvaSize(){

        const element = (function(){ let height = window.innerHeight; let width = window.innerWidth;
            
            return height < width ? (height * 0.8) : (width * 0.8);

        })(); log('canvas element: ' + Math.floor(element));
        
        canvas.setAttribute('width',element); canvas.setAttribute('height',element); return element

    }; let difficulty = 5 //temporary cells box n
    
    const size = canvaSize() / difficulty; log('icons size: ' + size + 'px');

    game.font = size + 'px Verdana' ; game.textAlign = 'end';

    function assignIcons(n) { log(maps[n])
        
        const map = maps[n].match(/[AX\-]+/g)
                           .map(a=>a.split(""));

        if (debug) {
            //for (let i = 0; i < difficulty; ++i) { const arr = map[i]; log('map[' + i + ']: ' + arr) }
            for (const wildcard in wildcards) { log('wildcards[' + wildcard + ']: ' + wildcards[wildcard]) }; log("wildcards[-]: ")
        };

        map.forEach((n, x) => {
            n.forEach((symbol, y) => { item=emojis[wildcards[symbol]]

                typeof item === 'undefined' && ( item = ' ');

                game.fillText(item, [size * (y + 1)], [size * (x + 1)])
            });
        })
    }; assignIcons(Math.floor(Math.random()*maps.length));
};

function setWildcards(){ let directions = [ 37, 38, 39, 40 ]

    for (const wildcard in wildcards) {

        wildcards[wildcard] = (function(){ log('directions: ' + directions, 'game')

            direction = directions[Math.floor(Math.random()*directions.length)];

            switch (wildcard == 'A' ? Math.floor(Math.random() * 2) : 0) {

                //choose posible a repeat option or, a new (just to get it some randomness)
                case 1: break;

                default: { index=directions.indexOf(direction); (index !== -1) && directions.splice(index, 1) };

            }; return direction
        })();
    }
}; function main() { setWildcards(); canvasInterface() };

document.addEventListener("keydown", function( event ) { verifiedKey(event.which); //let key = event.which
});