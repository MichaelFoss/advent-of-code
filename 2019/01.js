const fs = require('fs');

// 3226488
const INPUT_FILE = '01.input.txt';
// Expected test output is 2 + 2 + 654 + 33583 = 34241
// const INPUT_FILE = '01.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim());

const main = numbers => numbers
  .map(number => Math.floor(number / 3) - 2)
  .reduce((sum, curr) => sum + curr, 0);

console.log(main(data));

