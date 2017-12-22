// Part1

const FILENAME = './22.input.txt';
// const FILENAME = './22.test.txt';
const MAX_ITERATIONS = 1e4;
const DEBUG_MODE = false;

let x;
let y;
let dir = 'u';
let infectionBurstCount = 0;

function getInitialGrid() {
  const grid = require('fs').readFileSync(FILENAME, 'utf8').trim()
    .split('\n')
    .map(x => x.split(''));
  x = (grid[0].length - 1) / 2;
  y = (grid.length - 1) / 2;
  return grid;
}

function expandGrid(grid) {
  // How much to pad the grid by;
  // since there will be a turn every iteration,
  // we know the worst-case scenario is MAX_ITERATIONS / 2
  const PADDING = Math.floor(MAX_ITERATIONS / 2);

  // Make grid wider
  for (let y = 0; y < grid.length; y++) {
    for (let i = 0; i < PADDING; i++) {
      // Add before grid row
      grid[y].unshift('.');
      // Add after grid row
      grid[y].push('.');
    }
  }

  // Make grid taller
  const emptyRow = [];
  for (let i = 0; i < PADDING + grid.length + PADDING; i++) {
    emptyRow.push('.');
  }
  for (let i = 0; i < PADDING; i++) {
    // Add before grid
    grid.unshift([...emptyRow]);
    // Add after grid
    grid.push([...emptyRow]);
  }

  // Offset X & Y
  x += PADDING;
  y += PADDING;

  return grid;
}

function gridToString(grid) {
  const arrowMapping = {
    'u#': '⬆︎',
    'r#': '➡︎',
    'd#': '⬇︎',
    'l#': '⬅︎',
    'u.': '↑',
    'r.': '→',
    'd.': '↓',
    'l.': '←'
  }
  grid[y][x] = arrowMapping[dir + grid[y][x]];
  const str = grid
    .map(row => row.join(''))
    .join('\n');
  grid[y][x] = ['⬆︎', '➡︎', '⬇︎', '⬅︎'].indexOf(grid[y][x]) !== -1 ? '#' : '.';
  return str;
}

function turn(grid) {
  // Infected; turn right
  if (grid[y][x] === '#') {
    switch (dir) {
      case 'u': dir = 'r'; break;
      case 'r': dir = 'd'; break;
      case 'd': dir = 'l'; break;
      case 'l': dir = 'u'; break;
    }
  }
  // Not infected; turn left
  else {
    switch (dir) {
      case 'u': dir = 'l'; break;
      case 'l': dir = 'd'; break;
      case 'd': dir = 'r'; break;
      case 'r': dir = 'u'; break;
    }
  }
}

function toggleInfection(grid) {
  grid[y][x] = grid[y][x] === '#' ? '.' : '#';
  if (grid[y][x] === '#') {
    infectionBurstCount++;
  }
}

function advance() {
  switch (dir) {
    case 'u': y--; break;
    case 'd': y++; break;
    case 'l': x--; break;
    case 'r': x++; break;
  }
}

function getCount(grid) {
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === '#') {
        sum++;
      }
    }
  }
  return sum;
}

function part1() {
  const initialGrid = getInitialGrid();
  const grid = expandGrid(initialGrid);
  if (DEBUG_MODE) {
    console.log(`=== INITIAL ===`);
    console.log(gridToString(grid));
  }
  for (let i = 1; i <= MAX_ITERATIONS; i++) {
    turn(grid);
    toggleInfection(grid);
    advance();
    if (DEBUG_MODE) {
      console.log(`=== ${i} ===`);
      console.log(gridToString(grid));
    }
  }
  const count = getCount(grid);
  console.log(`Infected count: ${count}`);
  console.log(`Infection burst count: ${infectionBurstCount}`);
}

part1();

