/*
how to
tap the button pointing the same direction as the row in the center of screen. ignore the other arrows

there are two types of simple challenges: those with a single keystroke and those with two keystrokes

skills
attention to details, speed, and ability to ignore competing information

Resource: Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

let keyID = ''
let parallels = [];

let reset = () => { cleanKeyID(keyID); main() }

function cleanKeyID(id){
    
    log('keyID "' + String((typeof id === 'undefined') ? keyID : id) + '" erased','game')
    
    console.log('-'); keyID = ''
}

let are_identical = (value, not_compare) => { typeof value === 'undefined' && (value = char.get('s').join(''))

    c = (char.get('c')).join('');

    if ((Array.from(arrows.keys()).includes(c) && c.length === 4) && (parallels[1] && char.get('s')[0] === 37)){
    
        console.log('a'); return true

    } else if(['3837','4037'].includes(c) && (parallels[1] && char.get('s')[0] === 38)){

        console.log('b'); return true

    }; if(!not_compare){ return String(value) === c } else{ return false}
}

let check_parallels = (arr) => { const map = char.values()

    for (i=0; i < char.size; i++ ) { let value = map.next().value
    
        arr.push(+value[0] === (+value[1] - 2))

    }; return arr
}

let getArr = () =>{ key = String(char.get('c').join(''));

    if(Array.from(arrows_special.keys()).includes(key)){ return Array.from(arrows_special.keys())} // no-break to add 'arrows_double' too (2x1)

    else if(Array.from(arrows_double.keys()).includes(key)){ return Array.from(arrows_double.keys())} 

    else{return Array.from(arrows.keys())}
}

function contains_direction(n){ n = +n

    let directions = (arr) => { actualMainDirection = char.get('s')[0];
  
      if(arr.some(function (i) {return i === actualMainDirection})){
  
        if(parallels[1]){ return (char.get('s'))
        
        } else { return [(actualMainDirection - 1),actualMainDirection] }
  
      } else{ if(parallels[1]){return char.get('s')} else{return [actualMainDirection]} }
  
    }; console.log(directions([38,40])); return (directions([38,40]).includes(n))
};

function verified(c){

    if(are_identical() && !are_identical(c) && !contains_direction(+c.slice(0,2))){ reset() } else

    if(contains_direction(char.get('c')[0])){

        if(!contains_direction(+c.slice(0,2))){
            //if they are the same, simply choose a different
            if(char.get('c')[1] && !are_identical()){
                
                ((parallels[0] || (char.get('c')[0] === char.get('c')[1]))
                    ? true
                    : (c.slice(2) === String(char.get('c')[1]))) && reset()
                ;
            } else{reset()}
        }
    } else if(are_identical(c)){ reset() }
};

function main_game(id){

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
                
                (parallels[1] ? !are_identical() : !contains_direction(id)) && reset()

            } else if( are_identical() ){ reset() }; keyID != '' && cleanKeyID(); return

        /*a 'covert' default case, for those challenges that do not fall into the previous case and, therefore,
        requires necessary two keystrokes for its analysis*/

        //double challenge keyID arrows area
        }
    }

    /*in any case (one-keystroke or, two-keystroke challenge type), always need a common direction ('first anchor')
    one-keystroke are the exception
    */
    if(char.get('c')[1] ? keyID.length === 4 : true){ keyID != '' && (id = keyID);

        (are_identical(char.get('s').join(''),true) || getArr().includes(id)) && verified(id);

        keyID != '' && cleanKeyID()
    }
}

document.addEventListener("keydown", function(event) { n = event.which

    keyID === '' && console.clear();

    if(n === 27){cleanKeyID()} else{ log('answer: ' + n,'game')
    
        if(n >= 37 && n <= 40){ parallels = check_parallels([]); main_game(String(n))}
    }
})