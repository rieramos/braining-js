function log(message) { console.log("[braining][maps] " + message); }
function warn(message) { console.warn("[braining][maps] " + message); }

wildcards = (function(){

  //vars
  let wildcards = { 'I':'', 'O':'', 'X':'', '-':'',};
  const symbols = { 'up': '⬆️', 'right': '➡️', 'down': '⬇️', 'left': '⬅️', 'none': ' ',};

  //funcs
  function getItem(items) { log('directions avalaibles: ' + items)
  
    return items[Math.floor(Math.random()*items.length)];
  };

  for (const wildcard in wildcards) { var direction = getItem(Object.keys(symbols)); //random direction
    
    log(wildcard + ': ' + symbols[direction]);

    wildcards[wildcard] = symbols[direction]; delete symbols[direction]; //set wildcards

  }; return wildcards;
})();

//maps
const maps = [];

maps.push(`
IXXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
-XXXXXXXXX
OXXXXXXXXX`);

maps.push(`
O--XXXXXXX
X--XXXXXXX
XX----XXXX
X--XX-XXXX
X-XXX--XXX
X-XXXX-XXX
XX--XX--XX
XX--XXX-XX
XXXX---IXX
XXXXXXXXXX`);

maps.push(`
I-----XXXX
XXXXX-XXXX
XX----XXXX
XX-XXXXXXX
XX-----XXX
XXXXXX-XXX
XX-----XXX
XX-XXXXXXX
XX-----OXX
XXXXXXXXXX`);