import main from '../utils/main.js';

const DEBUG_MODE = false;
// It must be less than 4, according to the rules, so we subtract 1
const MAX_ADJACENT_ROLLS_FOR_FORKLIFTING = 4 - 1;

function isForkLiftable(grid, x, y) {
  if (!grid[y][x]) {
    return false;
  }
  let rollCount = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      const isMiddleCell = i === x && j === y;
      if (isMiddleCell) {
        continue;
      }
      const exists = i >= 0 && j >= 0 && j < grid.length && i < grid[0].length;
      if (!exists) {
        continue;
      }
      if (grid[j][i]) {
        rollCount++;
        if (rollCount > MAX_ADJACENT_ROLLS_FOR_FORKLIFTING) {
          return false;
        }
      }
    }
  }
  return true;
}

function removeRolls(grid) {
  let debugOutput = '';
  let forkLifts = 0;
  const removeList = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isForkLiftable(grid, x, y)) {
        forkLifts++;
        removeList.push({ x, y });
        if (DEBUG_MODE) {
          debugOutput += 'x';
        }
      } else {
        if (DEBUG_MODE) {
          debugOutput += grid[y][x] ? '@' : '.';
        }
      }
    }
    if (DEBUG_MODE) {
      debugOutput += '\n';
    }
  }
  if (DEBUG_MODE) {
    console.log(debugOutput);
  }
  for (let coordinates of removeList) {
    const { x, y } = coordinates;
    grid[y][x] = false;
  }
  return forkLifts;
}

main((input) => {
  const grid = input
    .split('\n')
    .map((line) => line.split('').map((ch) => (ch === '@' ? true : false)));
  let iteration = 0;
  let rollsRemoved = 0;
  let newRollsRemoved = 0;
  do {
    iteration++;
    if (DEBUG_MODE) {
      console.log(`[ITERATION ${iteration}]`);
    }
    newRollsRemoved = removeRolls(grid);
    rollsRemoved += newRollsRemoved;
  } while (newRollsRemoved !== 0);
  return rollsRemoved;
});
