const Point = require('./10.Point');
const fs = require('fs');
const util = require('util');

const ITERATIONS = process.argv.length === 3 ? process.argv[2] : 10905;

const INPUT_FILE = '10.input.txt';
// const INPUT_FILE = '10.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8').trim()
  .split('\n')
  .map(line => line.trim())
  .map(line => new Point(line));

const log = x => util.inspect(x, {
  maxArrayLength: null,
  colors: true,
});

const movePoints = points => points
  .forEach(point => point.move());

const main = (data) => {
  const data2 = data;
  for (let i = 0; i < ITERATIONS; i++) {
    movePoints(data2);
  }
  const data3 = Point.sortByPositions(data2);
  
  return `${log(data3)}

Position: ${Point.getMin(data3, 'position', 'x')}, ${Point.getMin(data3, 'position', 'y')} - ${Point.getMax(data3, 'position', 'x')}, ${Point.getMax(data3, 'position', 'y')}
Velocity: ${Point.getMin(data3, 'velocity', 'x')}, ${Point.getMin(data3, 'velocity', 'y')} - ${Point.getMax(data3, 'velocity', 'x')}, ${Point.getMax(data3, 'velocity', 'y')}

${log(Point.showPoints(data3))}
`;
}

console.log(main(data));

