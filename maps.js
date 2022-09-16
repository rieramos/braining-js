function log(message) { console.log("[braining][maps] " + message); }
function warn(message) { console.warn("[braining][maps] " + message); }

const symbols = { 'up': '⬆️', 'right': '➡️', 'down': '⬇️', 'left': '⬅️', };

wildcards = (function(){

  //vars
  const emojis = { ...symbols };
  let wildcards = { 'X':'', 'A':'', };

  //funcs
  function getItem(items) { log('directions avalaibles: ' + items)
  
    return items[Math.floor(Math.random()*items.length)];
  };

  for (const wildcard in wildcards) { //log(wildcard + ': ' + emojis[direction]);

    log('wildcard: ' + wildcard);

    switch (wildcard) {
      case 'A':
        //
        if ( Math.floor(Math.random()*1) === 1) {
          //
          wildcards[wildcard] = symbols[getItem(Object.keys(symbols))]; break;
        };

      default:
        //set wildcards
        direction = getItem(Object.keys(emojis)); log(direction)

        wildcards[wildcard] = emojis[direction]; delete emojis[direction];
    };

  };
  
  return wildcards;
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