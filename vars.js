let score; let startTime; let xy = new Map()

let lives = 1

// where will arrows directions IDs will be hosted
const debug = new Map([
    ['game', true],
    ['main', false]
]);

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

    if(+ss.toFixed(0) === 30){

        if(score < +(maxScore())){ lives = 1 } else{
            
            lives += 1; localStorage.setItem('maxScore', score)

            spanMaxScore.innerHTML = +(maxScore())

        }; score = 0; reset(); startTime = Date.now()
    }

}; const timeInterval = () => setInterval(showTime, 100)

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