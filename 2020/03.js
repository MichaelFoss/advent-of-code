const main = require('../utils/main.js');

const TREE = '#';
const OPEN = '.';

class Slope {
  trees = {};
  width = 0;
  height = 0;

  constructor(input) {
    this.width = input.indexOf('\n');
    // +1 on the input.length because there is no \n at the end of the file;
    // +1 on the width because there IS a \n at the end of each line
    this.height = (input.length + 1) / (this.width + 1);
    input
      .split('\n')
      .map((line, y) => line
        .split('')
        .forEach((char, x) => {
          if (char === TREE) {
            if (!this.trees[y]) {
              this.trees[y] = {};
            }
            this.trees[y][x] = true;
          }
        })
      );
  }

  isTree(pos) {
    return Boolean(this.trees[pos.y]) && Boolean(this.trees[pos.y][pos.x]);
  }

  move({ pos, right, down }) {
    let { x, y } = pos;
    x += right;
    y += down;
    if (x >= this.width) {
      x -= this.width;
    }
    return { x, y };
  };
}

// For debugging purposes
const getRow = ({ trees, width, row }) => {
  if (!Boolean(trees[row])) {
    return OPEN.repeat(width);
  }
  let s = '';
  for (let i = 0; i < width; i++) {
    s += trees[row][i] ? TREE : OPEN;
  }
  return s;
}

const toboggan = ({ slope, right, down }) => {
  let pos = { x: 0, y: 0 };
  let collisions = 0;
  do {
    pos = slope.move({ pos, right, down });
    if (slope.isTree(pos)) {
      collisions++;
    }
  }
  while (pos.y < slope.height);
  return collisions;
};

main(input => {
  const slope = new Slope(input);
  return {
    part1: toboggan({ slope, right: 3, down: 1 }),
    part2: [
      { right: 1, down: 1 },
      { right: 3, down: 1 },
      { right: 5, down: 1 },
      { right: 7, down: 1 },
      { right: 1, down: 2 },
    ]
      .map(({ right, down}) => toboggan({ slope, right, down }))
      .reduce((product, curr) => product * curr, 1),
  };
});
