/*
how to
tap the button pointing the same direction as the row in the center of screen. ignore the other arrows

skills
attention to details, speed, and ability to ignore competing information

From: Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

let keyID = '';
let wildcards = { 'A':'', 'X':'', }

function log(message, section) { debug[section] === undefined && (section = 'main');

    debug[section] && (console.log("[braining][main] " + message));
}

function warn(message) { debug && console.warn("[braining][main] " + message); }

//vars
canvas = document.querySelector('#game'); game = canvas.getContext('2d');

//events
window.addEventListener('load', main); window.addEventListener('resize', main);

function verifiedKey(id){

    if (String(wildcards['A']).length === 4){ keyID = keyID + '' + id;

        if (String(keyID).length < 4) {return}

    }else { keyID = id }

    (+wildcards['A'] === +wildcards['X']) ? (keyID != wildcards['A'] && main())
                                        : (+keyID === +wildcards['A'] && main()); keyID = ''
};

//usage: canvasInterface
function canvasInterface(){

    //usage: canvaSize
    function canvaSize(){ measure = 0.8;

        const element = (function(){ let height = window.innerHeight; let width = window.innerWidth;
            
            return height < width ? (height * measure) : (width * measure);

        })(); log('canvas element: ' + Math.floor(element));
        
        canvas.setAttribute('width',element); canvas.setAttribute('height',element); return element

    }; let difficulty = 5 //temporary cells box n
    
    const size = Math.floor(canvaSize() / difficulty) - 3; log('icons size: ' + size + 'px');

    game.font = size + 'px Verdana' ; game.textAlign = 'end'

    function assignIcons(n) { log(maps[n])
        
        const map = maps[n].match(/[AX\-]+/g)
                           .map(a=>a.split(""));

        if (debug['game']) {
            //for (let i = 0; i < difficulty; ++i) { const arr = map[i]; log('map[' + i + ']: ' + arr) }
            for (const wildcard in wildcards) {
                log('wildcards[' + wildcard + ']: ' + wildcards[wildcard], 'game')
            };
        };

        map.forEach((n, x) => {
            n.forEach((symbol, y) => {

                item=(function(){ n = wildcards[symbol];

                    if (String(n).length === 4){

                        return (n.slice(0,2) === n.slice(2,5)) ? arrows_two[n]: arrows_spec[n];

                    } else{ return arrows[n] };
                })();

                typeof item === 'undefined' && ( item = ' ');

                game.fillText(item, [size * (y + 1)], [size * (x + 1)])
            });
        })
    }; assignIcons(Math.floor(Math.random()*maps.length));
};

function setWildcards(){
    
    let directions = (function(){ dict = Object.keys(arrows)

        switch(Math.floor(Math.random() * 3)){
            case 0:     break;
            case 2:     dict = dict.concat(Object.keys(arrows_spec))
            default:    dict = dict.concat(Object.keys(arrows_two))

        }; return dict
    })();

    for (const wildcard in wildcards) {

        wildcards[wildcard] = (function(){ log('directions: ' + directions)

            direction = directions[Math.floor(Math.random()*directions.length)];

            switch (wildcard == 'A' ? Math.floor(Math.random() * 2) : 0) {

                //choose posible a repeat option or, a new (just to get it some randomness)
                case 1: break;

                default: { index=directions.indexOf(direction); (index !== -1) && directions.splice(index, 1) };

            }; return direction
        })();
    }
}; function main() { log('-','game'); setWildcards(); canvasInterface() };

document.addEventListener("keydown", function(event) { id = event.which

    log('answer: ' + id,'game');

    if(+id === 27){log('keyID erased','game'); keyID=''} else if(+id >= 37 && +id <= 40){verifiedKey(id)}
});