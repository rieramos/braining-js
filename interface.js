let size, map_n
let map = new Map();

//function warn(message) { debug && console.warn("[braining][main] " + message); }

game = canvas.getContext('2d');

/*check if it's a challenge with double keystroke or, a normal (two length) key and, on this basis select
the corresponding map/object w ascii characters*/

let item = (arr) => { key = arr.join('') //arr[0]+ '' + ((arr[1]) ? arr[1] : '')

    if (key.length === 4){

        if(arr[0] === arr[1]){ return arrows_double.get(key) } else

        if(Array.from(arrows_special.keys()).includes(key)){ return arrows_special.get(key) }

    }; return arrows.get(key)
}

//events
window.addEventListener('load', () => { interface_(); main(); fade_(); })

window.addEventListener('resize', () => { interface_(); characters_('resize') });

function interface_(){

    function canva_size(){ 

        const element = (function(){ height = window.innerHeight; width = window.innerWidth; measure = 0.8;

            return height < width ? (height * measure) : (width * measure);

        })(); log('canvas element: ' + Math.floor(element),'main');
        
        ['width','height'].map( property => { canvas.setAttribute(String(property), element) }); return element

    }
    
    size = ((Math.floor(canva_size()) / 5) - 3); log('icons size: ' + size + 'px','main');

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
    
        }); for (index = 0; index < 2; index++){ xy.set((index === 0 ? 'c' : 's'), arr[index]) } //asign to map

    }; set(get(keys(Array.from(arrows.keys()))))
};

function characters_(type){ game.clearRect(0, 0, canvas.width, canvas.height);

    // 'c': (c)entral arrow | 's': (s)urrounding arrows    
    map = maps[map_n].match(/[cs\-]+/g)
                     .map(string=>string.split(""));

    //each wildcard {c,o} value
    if (debug.get('game') && type != 'resize') {
        
        Array.from(xy).map(([key, value]) => (
            
            console.log('xy[' + key + ']: ' + value + ((key === 'c') ? ' (challenge keys)' : '')))
        );
    }
};

function fade_(){ setInterval(function(){ fContinue = true; }, 3000)

    function Fade(){
        this.render = function(){ let fInTime = 50;
            // fade in
            if(fTime < 0){ game.globalAlpha = 0; } else
            // fade in
            if(fTime >= 0 && fTime <= fInTime){ game.globalAlpha = 1*fTime/fInTime; } else
            
            // fade in stop
            if( fTime < (fInTime + 10)) { fContinue = false;

                game.globalAlpha = 1; fTime = (fInTime + 11); } else

            // fade out
            if(fTime >= fInTime && fTime <= (fInTime*2)) {
                
                game.globalAlpha = 1-1*(fTime-fInTime)/fInTime; } else
            
            // fade out stop
            if(fTime > (fInTime*2)) { game.globalAlpha = 0; } else { game.globalAlpha = 0; }
        }
    }; fade = new Fade();

    function Rect(rColor){

        if(rColor == 'random') { rColor = '#'+Math.floor(Math.random()*16777215).toString(16); }

        this.render = function(){ fade.render() //fade.render(10,1)

            game.fillStyle = rColor; game.fillText(character,yPlaneAxis,xPlaneAxis); game.globalAlpha = 1   
            //console.log('fAlpha ='+fade.fAlpha)
        }
    }; function TimeLine(){ this.render = function(){ fContinue && fTime++; }; }
    
    timeLine = new TimeLine(); color = 'random'//'rgba(255,255,255,1)';

    rect0 = new Rect(color); rect1 = new Rect(color); rect2 = new Rect(color)
    rect3 = new Rect(color); rect4 = new Rect(color); rect5 = new Rect(color)
    rect6 = new Rect(color); rect7 = new Rect(color); rect8 = new Rect(color)

    let character,yPlaneAxis,xPlaneAxis

    let i = -1; let fTime = 0

    function animate() { game.save()

        game.clearRect(0, 0, game.canvas.width, game.canvas.height)
        
        timeLine.render()

        game.fillText('',0, 0)

        map.forEach((n, x) => { i++
            n.forEach((wildcard, y) => { yPlaneAxis = size * (y + 1); xPlaneAxis = size * (x + 1);        

                if(wildcard != '-'){ character = item(xy.get(wildcard))
                    
                    switch(i){ 
                        case 0: rect0.render(); case 1: rect1.render()
                        case 2: rect2.render(); case 3: rect3.render()

                        case 4: rect4.render()
                        
                        case 5: rect5.render(); case 6: rect6.render()
                        case 7: rect7.render(); case 8: rect8.render()
                    }
                }
            })
        }); i = -1

        if (fTime >= 110){ fContinue = false; fTime = 0; cleanKeyID(); main(); }

    }; const animateInterval = setInterval(animate, 5);

}; function main() { map_n = Math.floor(Math.random()*maps.length); wildcards_(); characters_(); fContinue = true; };