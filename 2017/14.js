(() => {

/* Re-used Day 10 */

/* getKnotHash */
function getKnotHash(input) {
const listSize = 256;
const lengths = input.split('').map(x => x.charCodeAt(0));
lengths.push(...[17, 31, 73, 47, 23]);
const data = [];
for (let i = 0; i < listSize; i++) {
  data[i] = i;
}

function reverseSublist(data, pos, length) {
  for (let i = 0; i < pos; i++) {
    data.push(data.shift());
  }
  const subList = data.splice(0, length).reverse();
  data.splice(0, 0, ...subList);
  for (let i = 0; i < pos; i++) {
    data.unshift(data.pop());
  }
}

function incrementPos(pos, length, skipSize) {
  pos += length + skipSize;
  while (pos >= listSize) {
    pos -= listSize;
  }
  return pos;
}

let pos = 0;
let skipSize = 0;

for (let round = 0; round < 64; round++) {
  for (let lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
    reverseSublist(data, pos, lengths[lengthIndex]);
    pos = incrementPos(pos, lengths[lengthIndex], skipSize);
    skipSize++;
  }
}

for (let i = 0; i < 16; i++) {
  const arrToXor = data.splice(0, 16);
  data.push(arrToXor.reduce((accumulator, currentValue) => accumulator ^ currentValue));
}

return data.reduce((accumulator, currentValue) => accumulator + (currentValue < 16 ? '0' : '') + currentValue.toString(16), '');
/* /getKnotHash */
}


/* Day 14 */

// const key = 'flqrgnkx'; // Test - blocks = 8108, groups = 1242
const key = 'ljoxqyyw';
const rows = [];
for (let row = 0; row < 128; row++) {
  // Get knot hash
  let knotHash = getKnotHash(`${key}-${row}`);

  // Convert to hex
  let hexKnotHash = knotHash
    .match(/.{1,4}/g)
    .map(hexNumber => parseInt(hexNumber, 16).toString(2))
    .map(binaryNumber => '0'.repeat(16 - binaryNumber.length) + binaryNumber)
    .join('');

  // Add trailing zeroes (to ensure proper length of 128 bits)
  hexKnotHash += '0'.repeat(128 - hexKnotHash.length);

  // Add row for grid display
  rows.push(hexKnotHash);
}

let grid = rows.join('\n');
const usedBlocks = grid.replace(/[\n|0]/g, '').length;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

grid = rows
  .map(row => row
    .replace(/1/g, '#')
    .replace(/0/g, '-')
    .split('')
  )
  .map(row => row
    .map(cell => cell === '-' ? '----' : cell)
  );

let usedGroups = 0;
let maxGroupNumber = 0;

function getNextBlockPosition() {
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      if (grid[y][x] === '#') {
        return new Point(x, y);
      }
    }
  }
}

function polluteGrid(pos) {
  grid[pos.y][pos.x] = maxGroupNumber.toString();
  grid[pos.y][pos.x] = ' '.repeat(4 - grid[pos.y][pos.x].length) + grid[pos.y][pos.x];
  usedGroups++;

  // Northern adjacency
  if (pos.y !== 0 && grid[pos.y - 1][pos.x] === '#') {
    polluteGrid(new Point(pos.x, pos.y - 1));
  }

  // Southern adjacency
  if (pos.y !== 127 && grid[pos.y + 1][pos.x] === '#') {
    polluteGrid(new Point(pos.x, pos.y + 1));
  }

  // Western adjacency
  if (pos.x !== 0 && grid[pos.y][pos.x - 1] === '#') {
    polluteGrid(new Point(pos.x - 1, pos.y));
  }

  // Eastern adjacency
  if (pos.x !== 127 && grid[pos.y][pos.x + 1] === '#') {
    polluteGrid(new Point(pos.x + 1, pos.y));
  }
}

while (usedGroups !== usedBlocks) {
  maxGroupNumber++;
  pos = getNextBlockPosition();
  polluteGrid(pos);
}

grid = grid.map(row => row.join(',')).join('\n');

console.log(grid);
console.log(`Blocks used: ${usedBlocks}`);
console.log(`Groups used: ${maxGroupNumber}`);

})();
