const debug = true;

function log(message) { debug && console.log("[braining][maps] " + message); }
function warn(message) { debug && console.warn("[braining][maps] " + message); }

const symbols = { 'up': '⬆️', 'right': '➡️', 'down': '⬇️', 'left': '⬅️', };

wildcards = (function(){ const emojis = { ...symbols }; let wildcards = { 'X':'', 'A':'', }; //vars

  //funcs
  function getItem(items) { element = items[Math.floor(Math.random()*items.length)]; log('directions: ' + element); return element };

  for (const wildcard in wildcards) {
    switch (wildcard) {
      case 'A':
        //chooose a posible repeat option or, a new (just to get it some randomness)
        if ( Math.floor(Math.random()*1) === 1) { wildcards[wildcard] = symbols[getItem(Object.keys(symbols))]; break };

      default:
        //set wildcards
        direction = getItem(Object.keys(emojis));
        wildcards[wildcard] = emojis[direction]; delete emojis[direction];
    };

  }; return wildcards;
})();

                                                      //maps
const maps = [];

maps.push(`
X---X
-X-X-
--A--
-----
-----`);

maps.push(`
----X
---X-
--A--
---X-
----X`);

maps.push(`
-----
-----
--A--
-X-X-
X---X`);

maps.push(`
X----
-X---
--A--
-X---
X----`);