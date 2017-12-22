// Part2

const FILENAME = './22.input.txt';
// const FILENAME = './22.test.txt';
const MAX_ITERATIONS = 1e7;
const DEBUG_MODE = false;
const DEBUG_AFTER_ITERATIONS = 1e5;

// How much to pad the grid by; can't make it too big, so just guess
const PADDING = 1e3;

const STATE_CLEAN = '·';
const STATE_WEAKENED = '⚠︎';
const STATE_INFECTED = '!';
const STATE_FLAGGED = '✔︎';
const STATES = [
  STATE_CLEAN,
  STATE_WEAKENED,
  STATE_INFECTED,
  STATE_FLAGGED
];

const DIR_UP = '⬆︎';
const DIR_DOWN = '⬇︎';
const DIR_LEFT = '⬅︎';
const DIR_RIGHT = '➡︎';

let x;
let y;
let dir = DIR_UP;
const burstCounts = {};
STATES.map(state => burstCounts[state] = 0);

function getInitialGrid() {
  const grid = require('fs').readFileSync(FILENAME, 'utf8').trim()
    .replace(/\#/g, STATE_INFECTED)
    .replace(/\./g, STATE_CLEAN)
    .split('\n')
    .map(x => x.split(''));
  x = (grid[0].length - 1) / 2;
  y = (grid.length - 1) / 2;
  return grid;
}

function expandGrid(grid) {
  // Make grid wider
  if (DEBUG_MODE) {
    console.log('Making short grid wider');
  }
  for (let y = 0; y < grid.length; y++) {
    for (let i = 0; i < PADDING; i++) {
      // Add before grid row
      grid[y].unshift(STATE_CLEAN);
      // Add after grid row
      grid[y].push(STATE_CLEAN);
    }
  }

  // Make grid taller
  if (DEBUG_MODE) {
    console.log('Increasing grid height');
  }
  const emptyRow = [];
  for (let i = 0; i < PADDING + grid.length + PADDING; i++) {
    emptyRow.push(STATE_CLEAN);
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
  const currState = grid[y][x];
  grid[y][x] = dir;
  let s = grid
    .map(row => row.join(''))
    .join('\n');
  s += `\n${dir}: ${currState}\n`;
  grid[y][x] = currState;
  return s;
}

function turn(grid) {
  switch (grid[y][x]) {
    // Clean; turn left
    case STATE_CLEAN:
      switch (dir) {
        case DIR_UP:    dir = DIR_LEFT; break;
        case DIR_LEFT:  dir = DIR_DOWN; break;
        case DIR_DOWN:  dir = DIR_RIGHT; break;
        case DIR_RIGHT: dir = DIR_UP; break;
      }
      break;

    // Weakened; do nothing
    case STATE_WEAKENED:
      break;

    // Infected; turn right
    case STATE_INFECTED:
      switch (dir) {
        case DIR_UP:    dir = DIR_RIGHT; break;
        case DIR_RIGHT: dir = DIR_DOWN; break;
        case DIR_DOWN:  dir = DIR_LEFT; break;
        case DIR_LEFT:  dir = DIR_UP; break;
      }
      break;

    // Flagged; reverse
    case STATE_FLAGGED:
      switch (dir) {
        case DIR_UP:    dir = DIR_DOWN; break;
        case DIR_DOWN:  dir = DIR_UP; break;
        case DIR_RIGHT: dir = DIR_LEFT; break;
        case DIR_LEFT:  dir = DIR_RIGHT; break;
      }
      break;
  }
}

function toggleInfection(grid) {
  switch (grid[y][x]) {
    // Clean; weaken it
    case STATE_CLEAN:
      grid[y][x] = STATE_WEAKENED;
      break;

    // Weakened; infect it
    case STATE_WEAKENED:
      grid[y][x] = STATE_INFECTED;
      break;

    // Infected; flag it
    case STATE_INFECTED:
      grid[y][x] = STATE_FLAGGED;
      break;

    // Flagged; clean it
    case STATE_FLAGGED:
      grid[y][x] = STATE_CLEAN;
      break;
  }
  burstCounts[grid[y][x]]++;
}

function advance(grid) {
  switch (dir) {
    case DIR_UP:    y--; break;
    case DIR_DOWN:  y++; break;
    case DIR_LEFT:  x--; break;
    case DIR_RIGHT: x++; break;
  }
  if (y < 0 || x < 0 || y > grid.length || x > grid.length) {
    console.error(`ERROR: ${y},${x} is out of bounds.`);
    process.exit();
  }
}

function getCount(grid, state = STATE_INFECTED) {
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === state) {
        sum++;
      }
    }
  }
  return sum;
}

function part2() {
  const initialGrid = getInitialGrid();
  const grid = expandGrid(initialGrid);
  for (let i = 1; i <= MAX_ITERATIONS; i++) {
    turn(grid);
    toggleInfection(grid);
    advance(grid);
    if (DEBUG_MODE && DEBUG_AFTER_ITERATIONS && i % DEBUG_AFTER_ITERATIONS === 0) {
      console.log(`[${i}/${MAX_ITERATIONS}]`);
      console.log(gridToString(grid));
    }
  }
  if (DEBUG_MODE) {
    console.log('Counts:');
    STATES.map(state => console.log(`  ${state}: ${getCount(grid, state)}`));
    console.log('Burst counts:');
    STATES.map(state => console.log(`  ${state}: ${burstCounts[state]}`));
  }
  console.log(`Infected burst count: ${burstCounts[STATE_INFECTED]}`);
}

part2();

