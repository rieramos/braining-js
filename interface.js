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
window.addEventListener('load', () => { interface_(); main(); initCanvas(); })
window.addEventListener('resize', () => { interface_(); characters_('resize') });

function interface_(){

    function canva_size(){ 

        const element = (function(){ height = window.innerHeight; width = window.innerWidth; measure = 0.3;

            return height < width ? (height * measure) : (width * measure);

        })(); log('canvas element: ' + Math.floor(element),'main');
        
        ['width','height'].map( property => { canvas.setAttribute(String(property), element) }); return element

    }
    
    size = Math.floor(canva_size()) / 3; log('icons size: ' + size + 'px','main');

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

function initCanvas() { let character,yPlaneAxis,xPlaneAxis
 
    let i = -1; let fTime = 0

     function Fade(){
         this.render = function(fInTime,fOutTime){
             // fade in
             if(fTime < fInTime){ game.globalAlpha = 0; }
             // fade in
             else if(fTime >= fInTime && fTime <= 50+fInTime){ game.globalAlpha = 1*(fTime-fInTime)/50; }
             
             // fade in stop
             else if(fTime < fOutTime) { game.globalAlpha = 1; }
             
             // fade out
             else if(fTime >= fOutTime && fTime <= fOutTime+50) { game.globalAlpha = 1-1*(fTime-fOutTime)/50; }
             
             // fade out stop
             else if(fTime > fOutTime+50) { game.globalAlpha = 0; }
             
             // else ?
             else { game.globalAlpha = 0; }
         }
     }; fade = new Fade();

     function Rect(rColor){
     
        if(rColor == 'random') { rColor = '#'+Math.floor(Math.random()*16777215).toString(16); }

        this.render = function(fOutTime,fInTime){
             
            fade.render((typeof fInTime === 'undefined') ? 0 : fInTime,fOutTime)
            //fade.render(10,1)

            game.fillStyle = rColor; game.fillText(character,yPlaneAxis,xPlaneAxis)
            
            game.globalAlpha = 1//; console.log('fAlpha ='+fade.fAlpha)
        }     
     }; function TimeLine(){ this.render = function(){ fTime++; } }; timeLine = new TimeLine();

    color = 'random';
    // var color = 'rgba(255,255,255,1)';

    var rect0 = new Rect(color);
    var rect1 = new Rect(color); var rect2 = new Rect(color); var rect3 = new Rect(color); var rect4 = new Rect(color)
    var rect5 = new Rect(color); var rect6 = new Rect(color); var rect7 = new Rect(color); var rect8 = new Rect(color)
   
     function animate() { game.save()
        
        game.clearRect(0, 0, game.canvas.width, game.canvas.height); timeLine.render()
        
        //game.fillStyle = '#fff'
        
        game.fillText('',0, 0)

        map.forEach((n, x) => { i++
            n.forEach((wildcard, y) => { yPlaneAxis = size * (y + 1); xPlaneAxis = size * (x + 1);        

                if(wildcard != '-'){ character = item(xy.get(wildcard))
                    
                    switch(i){ 
                        case 0: rect0.render(170); case 1: rect1.render(195)
                        case 2: rect2.render(110); case 3: rect3.render(125)

                        case 4: rect4.render(190,25)
                        
                        case 5: rect5.render(155); case 6: rect6.render(170)
                        case 7: rect7.render(175); case 8: rect8.render(200)
                    }
                }
            })
        }); i = -1

         if (fTime >= 250){ fTime = 0; main(); }

         game.restore()

     }; var animateInterval = setInterval(animate, 15);
 }

function main() { map_n = Math.floor(Math.random()*maps.length); wildcards_(); characters_(); };