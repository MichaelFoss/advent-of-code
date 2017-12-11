(() => {

const input = window.localStorage.input.split(',');
/// const input = `se,sw,se,sw,sw`.split(',');

/*
-+      +--+      +--+      +--+
  \    /3   \    /2   \    /1   \
   +--+    -1+--+     1+--+     3+
  /3   \-2  /2   \-3  /1   \-4  /
-+    -2+--+     0+--+     2+--+
  \-1  /2   \-2  /1   \-3  /0   \
   +--+    -1+--+     1+--+     3+
  /2   \-1  /1   \-2  /0   \-3  /
-+    -2+--+     0+--+     2+--+
  \0   /1   \-1  /0   \-2  /-1  \
   +--+    -1+--+     1+--+     3+
  /1   \0   /x   \-1  /-1  \-2  /
-+    -2+--+  ** y+--+     2+--+
  \1   /0   \z   /-1  \-1  /-2  \
   +--+    -1+--+     1+--+     3+
  /0   \1   /-1  \0   /-2  \-1  /
-+    -2+--+     0+--+     2+--+
  \2   /-1  \1   /-2  \0   /-3  \
   +--+    -1+--+     1+--+     3+
  /-1  \2   /-2  \1   /-3  \0   /
-+    -2+--+     0+--+     2+--+
  \3   /    \2   /    \1   /    \
   +--+      +--+      +--+      +
*/

let x = 0;
let y = 0;
let z = 0;

let furthestDistance = -1;

function getDistance(x, y, z) {
  return (x > 0 ? x : 0) + (y > 0 ? y : 0) + (z > 0 ? z : 0);
}

for (let i = 0; i < input.length; i++) {
  switch (input[i]) {
    case 'nw': x++; y--; break;
    case 'n':  x++; z--; break;
    case 'ne': y++; z--; break;
    case 'sw': z++; y--; break;
    case 's':  z++; x--; break;
    case 'se': y++; x--; break;
  }
  furthestDistance = Math.max(furthestDistance, getDistance(x, y, z));
}

const distance = getDistance(x, y, z);
console.log(`Distance: ${distance}; Furthest Distance: ${furthestDistance}`);

})();

