const main = require('../utils/main.js');

const findFirstBasementEntrance = directions => {
  for (let i = 0, currentFloor = 0; i < directions.length && currentFloor >= 0; i++) {
    if (directions[i] === '(') {
      currentFloor++;
    }
    else if (directions[i] === ')') {
      currentFloor--;
    }
    else {
      throw new Error(`Unknown character ${directions[i]} at index ${i}`);
    }
    if (currentFloor < 0) {
      return i + 1;
    }
  }
};

main(input => {
  const directions = input
    .split('');
  const floor =
    directions.filter(x => x === '(').length -
    directions.filter(x => x === ')').length;
  const firstBasementEntrance = findFirstBasementEntrance(directions);
  return {
    part1: floor,
    part2: firstBasementEntrance,
  };
});
