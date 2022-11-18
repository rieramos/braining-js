let mtm // minimalist training mode

let keyID = ''

let xy = new Map()

let fContinue, validatingResponse

let score, pulsations, startTime, lives = 1 //numbers

// where will arrows directions IDs will be hosted
const debug = new Map([
    ['game', true],
    ['main', false]
]);

const canvas = document.querySelector('#game')

const pLives = document.querySelector('.lives');

const spanScores = document.querySelector('.pScores');

const spanMaxScore = document.querySelector('.pMaxScore');

let maxScore = () => { n = localStorage.getItem('maxScore')

    return +((n === null) ? 1 : n)
}

//intervals area
const spanTime = document.querySelector('.pTime');

let showTime = () => { ss = (((Date.now() - startTime ) % 60000) / 1000)

    spanTime.innerHTML = ss.toFixed(2)

    if(+ss.toFixed(0) === 30){ fContinue = false

        if(score < +(maxScore())){ lives = 1 } else{

            $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

            lives += 1; localStorage.setItem('maxScore', score)

            spanMaxScore.innerHTML = +(maxScore())

        }; score = 0; !mtm && reset()

        startTime = Date.now(); fContinue = true
    }
}; const timeInterval = () => setInterval(showTime, 100)

let cleanKeyID = () => { console.clear(); log('keyID(s) stored "' + keyID + '" erased','game'); console.log('-')

    keyID = ''; validatingResponse = false
}

function log(message, section) { debug.get(section) && (console.log("[braining][" + String(section) + '] ' + message))}

// there are two types of simple challenges: those with a single keystroke and those with two keystrokes
// first two digits indicate the direction

const arrows = new Map([
    ['37', '←'],
    ['38', '↑'],
    ['3738','↖',],
    ['39', '→'],
    ['3938','↗'],
    ['40', '↓'],
    ['3940', '↘'],
    ['3740', '↙']
]);

const arrows_double = new Map([
    ['3737','↞'],
    ['3838','↟'],
    ['3939','↠'],
    ['4040','↡']
]);

const arrows_special = new Map([
    ['3837','⤴'],
    ['3739','↔'],
    ['4037','⤵'],
    ['3840','↕']
])
                                                      //maps
const maps = [];

// 'c': (c)entral arrow
// 's': (s)urrounding arrows

maps.push(`
s---s
-s-s-
--c--
-----
-----`);

maps.push(`
----s
---s-
--c--
---s-
----s`);

maps.push(`
-----
-----
--c--
-s-s-
s---s`);

maps.push(`
s----
-s---
--c--
-s---
s----`);

maps.push(`
----s
---s-
--c--
-s---
s----`);

maps.push(`
s----
-s---
--c--
---s-
----s`);

//                                              events

document.querySelectorAll('input[type=checkbox], input[type=radio]').forEach(function(toggle) { let a;

    let changeDisplay = (value) => { document.querySelector('.bar').style.display=value;

        document.body.style.backgroundColor = (value === 'none') ? '#13f4ee' : 'indigo'

        canvas.style.backgroundColor = (value === 'none') ? 'transparent' : '#feff9d'

        canvas.style.border = (value === 'none') ? '0px' : '4px solid gray'

        pLives.style.display=value; document.querySelector('h3').style.display=value;
    }

    toggle.addEventListener('lcs-on', function(){ changeDisplay('none');

        startTime=Date.now(); mtm=true; main()
    });

    toggle.addEventListener('lcs-off', function(){ changeDisplay(''); mtm=false; main(); });
});
