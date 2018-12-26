const Grid = require('./06.Grid.js');
const Point = require('./06.Point.js');
const fs = require('fs');

const INPUT_FILE = '06.input.txt';
// const INPUT_FILE = '06.test.txt';

// Find everything less than 10000, per the problem specs
const MAX_DISTANCE = 9999;
// Test data
// const MAX_DISTANCE = 31;

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

const prettyPrint = ({ distances, grid, area }) =>
  [
    [
      [
        grid.minX,
        grid.maxX,
      ],
      [
        grid.minY,
        grid.maxY,
      ],
    ]
      .map(coord => coord.join('-'))
      .join(' x '),

    distances
      .map((row, y) => row
        // Insert coordinates
        .map((cell, x) => {
          if (grid.points.findIndex(point => point.x === x && point.y === y) !== -1) {
            return '*';
          }
          else if (cell <= MAX_DISTANCE) {
            return '#';
          }
          else {
            return '.';
          }
        })
        .join('')
      )
      .join('\n'),

    area,
  ]
    .join('\n\n')
;

const getDistances = grid => {
  const distances = [];
  for (let y = 0; y <= grid.maxY; y++) {
    distances[y] = [];
    for (let x = 0; x <= grid.maxX; x++) {
      distances[y][x] = grid.points
        .map(point => manhattanDistance({ point, x, y }))
        .reduce((sum, distance) => sum + distance);
    }
  }
  return distances;
};

const getArea = distances =>
  distances
    .reduce((sum, row) =>
      row
        .filter(cell => cell <= MAX_DISTANCE)
        .length
      + sum
    , 0)
;

const main = (data) => {
  const grid = new Grid(data);
  const distances = getDistances(grid);
  const area = getArea(distances);
  return prettyPrint({ distances, grid, area });
};

console.log(main(data));

