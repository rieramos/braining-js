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

let keyID = ''
let char = new Map()
let difficulty = 5 //temporary cells box n

function log(message, section) { debug.get(section) === undefined && (section = 'main');

    debug.get(section) && (console.log("[braining][main][" + String(section) + '] ' + message));
}

//function warn(message) { debug && console.warn("[braining][main] " + message); }

canvas = document.querySelector('#game'); game = canvas.getContext('2d');

//events
window.addEventListener('load', () => { interface_(); main() })
window.addEventListener('resize', () => { interface_(); characters_('resize') });

function utilities(type){ if(type === 'keyID' && keyID != ''){console.log('-'); log('keyID ("'+ keyID + '") erased','game'); console.log('-'); keyID=''}; }

function interface_(){

    function canva_size(){ 

        const element = (function(){ height = window.innerHeight; width = window.innerWidth; measure = 0.8;

            return height < width ? (height * measure) : (width * measure);

        })(); log('canvas element: ' + Math.floor(element));
        
        ['width','height'].map( property => { canvas.setAttribute(String(property), element) }); return element

    }
    
    size = (Math.floor(canva_size() / difficulty) - 3); log('icons size: ' + size + 'px');

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
    if (debug.get('game') && type != 'resize') { Array.from(char).map(([key, value]) => (log('char[' + key + ']: ' + value, 'game')));

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

function verified_(id){ let reset = () => { console.clear(); keyID = id; main() }
    
    let are_identical = (value) => { typeof value === 'undefined' && (value = char.get('s').join(''))
    
        return String(value) === (char.get('c')).join('')
    }

    let check_parallels = (arr) => { const map = char.values()

        for (i=0; i < char.size; i++ ) { let value = map.next().value
      
          arr.push(+value[0] === (+value[1] - 2))
      
        }; return arr
      
      }; let parallels = check_parallels([]);

    ///isn't a 'normal' (one keystroke) challenge? / it's a double keystroke challenge?
    //eg. wilcards.get('c') = (3737 = [37, 37]) = '↞'

    if (char.get('c')[1]){ keyID = keyID + '' + id

        /*if the second ID of challenge is greater than the first by 2, it means that it is an arrow w
        opposite poles towards the same axis {↕,↔}.
        
        so if the keystroke ID is one of the directions to which the arrow of the '(c)entral' challenge key points,
        it will be correct and, in this sense, to supplant it identically by the preferred random address that
        initially chosen to be answer in case of.
        
        all of this it was already verified, so yeeeet, just for a 'quckly' yes-or-yes check pass result hereinafter*/
        if(parallels[0]){ log('it is parallel arrow?','game')

            if ((char.get('c')).includes(+id)){
                
                (parallels[1] ? !are_identical() : (id != char.get('s')[0])) && reset()

            } else if( are_identical() ){ reset() }; return


        /*a 'covert' default case, for those challenges that do not fall into the previous case and, therefore,
        requires necessary two keystrokes for its analysis*/

        //double challenge keyID arrows area
        } else if(char.get('c')[0] === char.get('c')[1]){ log('it is double arrow?','game')

            /* if the (s)urrounding arrows are not double or special arrows, but one keystroke and contains
            basically the same direction that challenge (c)entral key, so set them to the same keyID (as if they were
            doubles, as can be seen, similar to the first case)*/

            /*is to correctly channel the challenge in the dynamics of selecting in the true other direction
            avoiding a meaningless exception*/

            if(keyID.length === 4 && !are_identical()){

                if(parallels[1] ? (char.get('s')).includes(char.get('c')[0]) : (char.get('c')[0] === char.get('s')[0])){

                    char.set('s', char.get('c'))
                }
            };

        } // if it's doesn't fit in any of the before possible patterns, so it's a 'rebeld' deviaton arrow xd
    }

    /*in any case (one-keystroke or, two-keystroke challenge type), always need a common direction ('first anchor')
    one-keystroke are the exception
    */

    let getArr = () =>{ key = String(char.get('c').join(''));

        if (Array.from(arrows_special.keys()).includes(key)){ return Array.from(arrows_special.keys())} // no-break to add 'arrows_double' too (2x1)

        else if (Array.from(arrows_double.keys()).includes(key)){ return Array.from(arrows_double.keys())} 

        else{return Array.from(arrows.keys())}
    }

    function check_directions(){

        directions = [38,40].some(function (n) {

            if (n === char.get('s')[0]){

                if (parallels[1]){ return (char.get('s')).concat([(n - 1)]) }else {return [(n - 1),(char.get('s')[0])]};
            }
        })

        if(directions.length === 0){ if(parallels[1]){return char.get('s')} else{return [(char.get('s')[0])]}

        }else {return directions}
    }

    function verified(c){

        //are going to the same address?
        if((check_directions()).includes(char.get('c')[0])){

            if(id.slice(0,2) != char.get('c')[0]){
                
                //if they are the same, simply choose a different
                if(are_identical()  && !are_identical(id)){reset()} else
                
                if(char.get('c')[1] && !are_identical()){
                    
                    ((parallels[0] || (char.get('c')[0] === char.get('c')[1]))
                        ? true
                        : (id.slice(2) === String(char.get('c')[1]))) && reset()
                    ;
            
                } else{reset()}
            }
        } else if(are_identical(id)){ reset() }

    };

    if(char.get('c')[1] ? keyID.length === 4 : true){ keyID != '' && (id = keyID);

        (getArr().includes(id) && verified())

        utilities('keyID')
    }
}

function main() { utilities('keyID'); map_n = Math.floor(Math.random()*maps.length); wildcards_(); characters_() };

document.addEventListener("keydown", function(event) { id = event.which

    if(+id === 27){ utilities('keyID')

    } else{ log('answer: ' + id,'main'); if(+id >= 37 && +id <= 40){verified_(String(id))}}
});