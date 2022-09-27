/*
how to
tap the button pointing the same direction as the row in the center of screen. ignore the other arrows

there are two types of simple challenges: those with a single keystroke and those with two keystrokes

skills
attention to details, speed, and ability to ignore competing information

Resource: Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

let size
let map_n
let difficulty = 5 //temporary cells box n

//function warn(message) { debug && console.warn("[braining][main] " + message); }

canvas = document.querySelector('#game'); game = canvas.getContext('2d');

//events
window.addEventListener('load', () => { interface_(); main() })
window.addEventListener('resize', () => { interface_(); characters_('resize') });

function interface_(){

    function canva_size(){ 

        const element = (function(){ height = window.innerHeight; width = window.innerWidth; measure = 0.8;

            return height < width ? (height * measure) : (width * measure);

        })(); log('canvas element: ' + Math.floor(element),'main');
        
        ['width','height'].map( property => { canvas.setAttribute(String(property), element) }); return element

    }
    
    size = (Math.floor(canva_size() / difficulty) - 3); log('icons size: ' + size + 'px','main');

    game.font = size + 'px Verdana' ; game.textAlign = 'end'
}

function wildcards_(){

    function get(keys){

        let arr = ['c','s'].map( wildcard => {

            //get random arrow style/type
            key = keys[Math.floor(Math.random()*keys.length)]

            //if it's the (c)entral key then have the possibility to leave the option chosen avoiding normal process
            //(to remove it) as a repeated to be possibly choosen by '(s)urrounding' arrows (just to have some randomness)

            switch (wildcard == 'c' ? Math.floor(Math.random() * 2) : 0) {

                case 1: break;

                default: { index=keys.indexOf(key); (index !== -1) && keys.splice(index, 1) };

            }; return key
            
        }); return arr
    };

    let keys = (arr) => {

        //depending on randomness, choose some arrows 'ascii characters' map/object
        switch(Math.floor(Math.random() * 3)){
            case 0:     break;
            case 2:     arr = arr.concat(Array.from(arrows_special.keys())) // no-break to add 'arrows_double' too (2x1)
            default:    arr = arr.concat(Array.from(arrows_double.keys())

        )}; return arr
    };

    function set(keys){
        //split at 2 (index) each wildcard keyID giving one or, two separate items each one of two length, to have a slices map
        // eg. ([ ['c', [xx,xx]], ['s', [xx,xx]] ]) || ([ ['c', [xx]], ['s', [xx,xx]] ]) || etc
        
        arr = keys.map( value => { value = String(value); arr = [+value.slice(0, 2), +value.slice(2)]
    
            return (arr[1]) ? arr : [arr[0]] //check empty string
    
        }); for (index = 0; index < 2; index++){ char.set((index === 0 ? 'c' : 's'), arr[index]) } //asign to map

    }; set(get(keys(Array.from(arrows.keys()))))
};

function characters_(type){ game.clearRect(0, 0, canvas.width, canvas.height);

    // 'c': (c)entral arrow | 's': (s)urrounding arrows    
    const map = maps[map_n].match(/[cs\-]+/g)
                           .map(string=>string.split(""));

    //each wildcard {c,o} value
    if (debug.get('main') && type != 'resize') { Array.from(char).map(([key, value]) => (log('char[' + key + ']: ' + value, 'main')));

        //for (let i = 0; i < difficulty; ++i) { const arrows_ids_itemized = map[i]; log('map[' + i + ']: ' + arrows_ids_itemized) }
    }

    let item = (arr) => { key = arr.join('') //arr[0]+ '' + ((arr[1]) ? arr[1] : '')

        //check if it's a challenge with double keystroke or, a normal (two length) key and, on this basis select
        //the corresponding map/object w ascii characters
        if (key.length === 4){

            if(arr[0] === arr[1]){ return arrows_double.get(key) } else

            if(Array.from(arrows_special.keys()).includes(key)){ return arrows_special.get(key) }

        }; return arrows.get(key)
    }

    map.forEach((n, x) => {
        n.forEach((wildcard, y) => {
            game.fillText((wildcard === '-') ? ' ' : item(char.get(wildcard)), [size * (y + 1)], [size * (x + 1)]);
        });
    });
};

function main() { map_n = Math.floor(Math.random()*maps.length); wildcards_(); characters_() };