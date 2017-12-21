function rotateLeft(grid) {
  // TODO: Holy crap please optimize me
    /*
    2x2 rotate left
    0,0 0,1    0,1 1,1
    1,0 1,1    0,0 1,0

    3x3 rotate left
    0,0 0,1 0,2    0,2 1,2 2,2
    1,0 1,1 1,2    0,1 1,1 2,1
    2,0 2,1 2,2    0,0 1,0 2,0
    */
  const newGrid = [];
  const SIZE = grid.length;
  for (let y = 0; y < SIZE; y++) {
    newGrid.push([]);
    for (let x = 0; x < SIZE; x++) {
      newGrid[y].push(grid[x][SIZE - y - 1]);
    }
  }
  return newGrid;
}

function rotateRight(grid) {
  // TODO: Holy crap please optimize me
    /*
    2x2 rotate right
    0,0 0,1    1,0 0,0
    1,0 1,1    1,1 0,1

    3x3 rotate right
    0,0 0,1 0,2    2,0 1,0 0,0
    1,0 1,1 1,2    2,1 1,1 0,1
    2,0 2,1 2,2    2,2 1,2 0,2
    */
  const newGrid = [];
  const SIZE = grid.length;
  for (let y = 0; y < SIZE; y++) {
    newGrid.push([]);
    for (let x = 0; x < SIZE; x++) {
      newGrid[y].push(grid[SIZE - x - 1][y]);
    }
  }
  return newGrid;
}

function flipVertical(grid) {
  // TODO: Holy crap please optimize me
    /*
    2x2 horizontal flip
    0,0 0,1    1,0 1,1
    1,0 1,1    0,0 0,1

    3x3 horizontal flip
    0,0 0,1 0,2    2,0 2,1 2,2
    1,0 1,1 1,2    1,0 1,1 1,2
    2,0 2,1 2,2    0,0 0,1 0,2
    */
  const newGrid = [];
  const SIZE = grid.length;
  for (let y = 0; y < SIZE; y++) {
    newGrid.push([]);
    for (let x = 0; x < SIZE; x++) {
      newGrid[y].push(grid[SIZE - y - 1][x]);
    }
  }
  return newGrid;
}

function flipHorizontal(grid) {
  // TODO: Holy crap please optimize me
    /*
    2x2 horizontal flip
    0,0 0,1    0,1 0,0
    1,0 1,1    1,1 1,0

    3x3 horizontal flip
    0,0 0,1 0,2    0,2 0,1 0,0
    1,0 1,1 1,2    1,2 1,1 1,0
    2,0 2,1 2,2    2,2 2,1 2,0
    */
  const newGrid = [];
  const SIZE = grid.length;
  for (let y = 0; y < SIZE; y++) {
    newGrid.push([]);
    for (let x = 0; x < SIZE; x++) {
      newGrid[y].push(grid[y][SIZE - x - 1]);
    }
  }
  return newGrid;
}

module.exports = { rotateLeft, rotateRight, flipHorizontal, flipVertical };

