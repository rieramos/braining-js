/*
how to
- if all the arrows are the same, then choose a different one in repertory

- if the middle one is different, follow your heart... xD nah, the direction of that arrow

there are two types of simple challenges: those with a single keystroke and those with two keystrokes

there are two types of simple challenges: those with a single keystroke and those with two keystrokes

skills
attention to details, speed, and ability to ignore competing information

bibliography: Consulting Inc, M. (2012). Mind Games (Version 3.4.5) [Mobile App]. Play Store. https://play.google.com/store/apps/details?id=mindware.mindgames
*/

let setAssets = () => {

    lives = lives - 1

    if(lives === 0){ lives = 3; score = 0
    
        if(typeof startTime != 'undefined'){ startTime = Date.now()
        
            $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 )
        }
    }

    score === 0 && (spanMaxScore.innerHTML = +(maxScore()))

    pLives.innerHTML = '❤️'.repeat(lives); spanScores.innerHTML =  score
    
}; setAssets()

let reset = () => { cleanKeyID(keyID); main()

    if(typeof startTime === 'undefined'){ startTime = Date.now(); timeInterval() }

    setAssets()
}

/**/

let keyID = ''
let parallels = []

function cleanKeyID(id){
    
    log('keyID "' + String((typeof id === 'undefined') ? keyID : id) + '" erased','main')
    
    console.log('-'); keyID = ''
}

let are_identical = (value, not_compare) => { typeof value === 'undefined' && (value = xy.get('s').join(''))

    c = (xy.get('c')).join('');

    //check for exceptional checks, when the surrounding arrows are vertical and, therefore, also represent a vertical direction
    if ((Array.from(arrows.keys()).includes(c) && c.length === 4) && (parallels[1] && xy.get('s')[0] === 37)){
    
        return true

    } else if(['3837','4037'].includes(c) && (parallels[1] && xy.get('s')[0] === 38)){

        return true
        
    //normal comprobation
    }; if(!not_compare){ return String(value) === c } else{ return false }
}

let check_parallels = (arr) => { const map = xy.values()

    /*if the second ID of challenge is greater than the first by 2, it means that it is an arrow w
    opposite poles towards the identical axis {↕,↔}*/

    for (i=0; i < xy.size; i++ ) { let value = map.next().value
    
        arr.push(+value[0] === (+value[1] - 2))

    }; return arr
}

let get_c_arrow_set = () =>{ key = String(xy.get('c').join(''));

    if(Array.from(arrows_special.keys()).includes(key)){ return Array.from(arrows_special.keys())} // no-break to add 'arrows_double' too (2x1)

    else if(Array.from(arrows_double.keys()).includes(key)){ return Array.from(arrows_double.keys())} 

    else{return Array.from(arrows.keys())}
}


/*function in charge of checking the statements below*/
function vertical_direction_conversor(n){ n = +n

    /*- an arrow pointing up (38) is also like one pointing to the left

    - an arrow pointing down (40) is also like one pointing to the right

    it's like the 'correspondence principle' or, 'schrodinger cat' but w directions lol*/

    let directions = (arr) => { sample_direction = xy.get('s')[0];
  
        //do the surrounding arrows contain a vertical direction?
        if(arr.some(function (i) {return i === sample_direction})){
    
            // are these parallel? if it is, dont do the conversion
            if(parallels[1]){ return (xy.get('s'))
            /*else, the corresponding address to x vertical direction is obtained simply by subtracting, resulting in a
            horizontal direction ID*/
            } else { return [(sample_direction - 1),sample_direction] }
    
        //else, likewise, if these aren't parallel, return the unique direction
        } else{ if(parallels[1]){return xy.get('s')} else{return [sample_direction]} }
  
    }; return (directions([38,40]).includes(n))
};

function StartGame(id){
    
    let sum_assets = () => { lives += ((lives === 3) ? 1 : 2); score += 1; mtm && reset(); }

    function verified_keystroke(c){

        if(are_identical() && !are_identical(c) && !vertical_direction_conversor(+c.slice(0,2))){ sum_assets() } else
    
    
        /*two-keystroke challenge type, always need the first common direction/anchor
        
        unless, depending on the challenge
    
            - one-keystroke
            - they are identical
            - no alternative vertical/horizontal option possible
        */
    
        if(vertical_direction_conversor(xy.get('c')[0])){
    
            if(!vertical_direction_conversor(+c.slice(0,2))){
                //if they are the identical, simply choose a different
                if(xy.get('c')[1] && !are_identical()){
                    
                                       //check if double
                    ((parallels[0] || (xy.get('c')[0] === xy.get('c')[1]))
                        ? true
                        : (c.slice(2) === String(xy.get('c')[1]))) && sum_assets()
                    ;
                } else{sum_assets()}
            }
        } else if(are_identical(c)){ sum_assets() }
    };

    /*the central arrow isn't a 'normal' (one keystroke) challenge?
    eg. wilcards.get('c') = [37, 37] (3737, in theory) = '↞'*/

    if (xy.get('c')[1]){ keyID = keyID + '' + id

        //its a parallel arrow ({↕,↔})?

        if(parallels[0]){

            //if the keystroke ID is one of the directions to which the arrow of the '(c)entral' challenge key points

            if ((xy.get('c')).includes(+id)){

                /*the only ways for the answer to be correct, are

                are the surrounding arrows parallel?

                - if, it should not be equal to those

                - else, that means those do not point directly or indirectly (see function 'vertical_direction_converter') to
                the identical direction, so it can be any other than those.*/

                (parallels[1] ? !are_identical() : !vertical_direction_conversor(id)) && sum_assets()

            // else, must be identical

            } else if( are_identical() ){ sum_assets() }; keyID != '' && cleanKeyID();
            
            !mtm && reset(); return
        }
    }

    if(xy.get('c')[1] ? keyID.length === 4 : true){ keyID != '' && (id = keyID);

        (are_identical(xy.get('s').join(''),true) || get_c_arrow_set().includes(id)) && verified_keystroke(id);

        !mtm && reset()

        keyID != '' && cleanKeyID()
    }
}
