let char = new Map()

const debug = new Map([
    ['game', true],
    ['main', false]
]);

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