const io = require('./21.io.js');
const ruleUtils = require('./21.ruleUtils.js');

const DEBUG_ON = false;

function getBrokenUpGrid(grid) {
  const SIZE = grid.length;
  let PIECE_SIZE = (SIZE % 2 === 0 ? 2 : 3);
  let NEW_SIZE = SIZE / PIECE_SIZE;
  const newGrid = [];

  if (DEBUG_ON) {
    console.log(io.gridToString(grid));
    console.log(`Breaking up into new grid of ${NEW_SIZE}x${NEW_SIZE}, each with ${PIECE_SIZE}x${PIECE_SIZE} sub-grids`);
  }

  for (let sliceY = 0; sliceY < NEW_SIZE; sliceY++) {
    newGrid.push([]);
    for (let sliceX = 0; sliceX < NEW_SIZE; sliceX++) {
      const subGrid = [];
      for (let y = 0; y < PIECE_SIZE; y++) {
        subGrid.push([]);
        for (let x = 0; x < PIECE_SIZE; x++) {
          const gridX = sliceX * PIECE_SIZE + x;
          const gridY = sliceY * PIECE_SIZE + y;
          if (DEBUG_ON) {
            console.log(`Adding to subGrid of ${sliceY},${sliceX} grid[${gridY},${gridX}]`);
          }
          subGrid[y].push(grid[gridY][gridX]);
        }
      }
      newGrid[sliceY].push(subGrid);
    }
  }

  if (DEBUG_ON) {
    for (let y = 0; y < newGrid.length; y++) {
      for (let x = 0; x < newGrid[0].length; x++) {
        console.log(`Slice ${y},${x}:`);
        console.log(newGrid[y][x]);
        console.log(io.gridToString(newGrid[y][x]));
      }
    }
  }

  return newGrid;
}

function getCombinedGrid(grid) {
  const SIZE = grid.length;
  const PIECE_SIZE = grid[0][0].length;
  const combinedGrid = [];
  for (let sliceY = 0; sliceY < SIZE; sliceY++) {
    for (let y = 0; y < PIECE_SIZE; y++) {
      const row = [];
      for (let sliceX = 0; sliceX < SIZE; sliceX++) {
        for (let x = 0; x < PIECE_SIZE; x++) {
          row.push(grid[sliceY][sliceX][y][x]);
        }
      }
      combinedGrid.push(row);
    }
  }
  return combinedGrid;
}

function getExpandedGrid(grid, rules) {
  const newGrid = [];
  const SIZE = grid.length;
  const brokenUpGrid = getBrokenUpGrid(grid);
  const BROKEN_SIZE = brokenUpGrid.length;
  const PIECE_SIZE = brokenUpGrid[0][0].length;
  for (let y = 0; y < BROKEN_SIZE; y++) {
    for (let x = 0; x < BROKEN_SIZE; x++) {
      if (DEBUG_ON) {
        console.log(`-- Running rule on broken grid ${y},${x} --`);
      }
      brokenUpGrid[y][x] = ruleUtils.runRule(brokenUpGrid[y][x], rules);
    }
  }
  const expandedGrid = getCombinedGrid(brokenUpGrid);
  return expandedGrid;
}

module.exports = { getExpandedGrid };

