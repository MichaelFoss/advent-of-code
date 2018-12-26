const Grid = require('./06.Grid.js');
const Point = require('./06.Point.js');
const fs = require('fs');

const INPUT_FILE = '06.input.txt';
// const INPUT_FILE = '06.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
  .trim()
  .split('\n')
  .map(coords => coords
    .split(', ')
    .map(coord => parseInt(coord))
  )
  .map(coords => new Point({
    x: coords[0],
    y: coords[1],
  }))
;

const manhattanDistance = ({ point, x, y }) => (
  Math.abs(point.x - x) +
  Math.abs(point.y - y)
);

const getClosestPoint = ({ grid, x, y }) => {
  let maxIndex = 0;
  let maxDistance = manhattanDistance({ point: grid.points[0], x, y });
  let isSame = false;
  for (let i = 1; i < grid.points.length; i++) {
    const point = grid.points[i];
    const distance = manhattanDistance({ point, x, y });
    if (distance < maxDistance) {
      maxIndex = i;
      maxDistance = distance;
      isSame = false;
    }
    else if (distance === maxDistance) {
      isSame = true;
    }
  }
  if (isSame) {
    return -1;
  }
  else {
    return maxIndex;
  }
};

const getOwners = grid => {
  const owners = [];
  for (let y = 0; y <= grid.maxY + 1; y++) {
    owners[y] = [];
    for (let x = 0; x <= grid.maxX + 1; x++) {
      owners[y][x] = getClosestPoint({ grid, x, y });
    }
  }
  return owners;
};

const prettyPrint = ({ owners, grid, ignoreList, answer }) =>
  [
    [
      grid.maxX,
      grid.maxY,
    ]
      .join('x'),

    owners
      .map((row, y) => row
        // Insert coordinates
        .map((cell, x) => grid.points
          .findIndex(point => point.x === x && point.y === y) === -1 ? cell : '*')
        // Print same-distance points using periods
        .map(cell => cell === -1 ? '.' : cell.toString())
        .join('')
      )
      .join('\n'),

    ignoreList
      .toString(),

    `Max Finite Distance: ${answer.distance} by owner ${answer.owner}`,
  ]
    .join('\n\n')
;

const getIgnoreList = ({ owners, grid }) => {
  const list = [];
  for (let y = 0; y <= grid.maxY + 1; y++) {
    if (owners[y][0] !== -1 && !list.includes(owners[y][0])) {
      console.log(`${owners[y][0]} @ [0, ${y}]`);
      list.push(owners[y][0]);
    }
    if (owners[y][grid.maxX + 1] !== -1 && !list.includes(owners[y][grid.maxX + 1])) {
      console.log(`${owners[y][grid.maxX + 1]} @ [${grid.maxX + 1}, ${y}]`);
      list.push(owners[y][grid.maxX + 1]);
    }
  }
  for (let x = 1; x <= grid.maxX + 1; x++) {
    if (owners[0][x] !== -1 && !list.includes(owners[0][x])) {
      console.log(`${owners[0][x]} @ [${x}, 0]`);
      list.push(owners[0][x]);
    }
    if (owners[grid.maxY + 1][x] !== -1 && !list.includes(owners[grid.maxY + 1][x])) {
      console.log(`${owners[grid.maxY + 1][x]} @ [${x}, ${grid.maxY + 1}]`);
      list.push(owners[grid.maxY + 1][x]);
    }
  }
  return list.sort();
}

const getArea = ({ owners, owner }) =>
  owners
    .filter((row, rowNum) => rowNum !== 0 && rowNum !== owners.length - 1)
    .reduce((sum, row) =>
      row
        .filter((cell, cellNum) => cellNum !== 0 && cellNum !== owners[0].length)
        .filter(cell => cell === owner)
        .length
      + sum
    , 0)
;

const getMaxFiniteDistance = ({ owners, grid, ignoreList }) => {
  maxDistance = 0;
  maxOwner = -1;
  grid.points
    .forEach((point, owner) => {
      if (ignoreList.includes(owner)) {
        return;
      }
      const distance = getArea({ owners, owner });
      if (maxDistance < distance) {
        maxOwner = owner;
        maxDistance = distance;
      }
    });
  return {
    owner: maxOwner,
    distance: maxDistance,
  };
};

const main = (data) => {
  const grid = new Grid(data);
  const owners = getOwners(grid);
  const ignoreList = getIgnoreList({ owners, grid });
  const answer = getMaxFiniteDistance({ owners, grid, ignoreList });
  return prettyPrint({ owners, grid, ignoreList, answer });
};

console.log(main(data));

