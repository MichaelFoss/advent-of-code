const main = require('../utils/main.js');

const grids = [
// part 1
`
XXXXX
X123X
X456X
X789X
XXXXX
`,
// part 2
`
XXXXXXX
XXX1XXX
XX234XX
X56789X
XXABCXX
XXXDXXX
XXXXXXX
`,
];

const moveCodeOffsets = {
  'U': { x:  0, y: -1, },
  'D': { x:  0, y:  1, },
  'L': { x: -1, y:  0, },
  'R': { x:  1, y:  0, },
};

const getNewPosition = (pos, bathroomGrid, moveCode) => {
  if (bathroomGrid[pos.y + moveCodeOffsets[moveCode].y][pos.x + moveCodeOffsets[moveCode].x] === 'X') {
    return {
      x: pos.x,
      y: pos.y,
    };
  }
  else {
    return {
      x: pos.x + moveCodeOffsets[moveCode].x,
      y: pos.y + moveCodeOffsets[moveCode].y,
    };
  }
};

const getStartingPosition = (grid, number) => {
  // We can start 1 early and end 1 early
  // because we know the outer border is all Xs
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      if (grid[y][x] === number) {
        return { x, y };
      }
    }
  }
  throw new Error(`Could not find ${number} in grid`);
}

const getBathroomCode = (codes, codeGrid, startingPosition) => {
  let bathroomCode = '';
  let pos = {
    ...startingPosition,
  };
  codes.forEach(code => {
    code.forEach(moveCode => {
      pos = getNewPosition(pos, codeGrid, moveCode);
    });
    bathroomCode += codeGrid[pos.y][pos.x];
  });
  return bathroomCode;
};

main(input => {
  const codes = input
    .split('\n')
    .map(line => line.split(''));
  const bathroomGrids = grids
    .map(s => s
      .trim()
      .split('\n')
      .map(x => x.split(''))
    );
  return {
    part1: getBathroomCode(codes, bathroomGrids[0], getStartingPosition(bathroomGrids[0], '5')),
    part2: getBathroomCode(codes, bathroomGrids[1], getStartingPosition(bathroomGrids[1], '5')),
  };
});
