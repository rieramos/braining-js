//vars
const debug = { main: false, game: true }

const arrows = { 37: '←', 38: '↑', 39: '→', 40: '↓'};
const arrows_two = {3737:'↞',3838:'↟',3939:'↠',4040:'↡'};
const arrows_spec = {3738:'⤴', 3739:'↔', 3740:'⤵', 3837:'↖', 3839:'↗', 3840:'↕', 4037: '↙', 4039: '↘'}

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

maps.push(`
----X
---X-
--A--
-X---
X----`);

maps.push(`
X----
-X---
--A--
---X-
----X`);