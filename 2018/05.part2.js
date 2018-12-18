const fs = require('fs');

const INPUT_FILE = '05.input.txt';
// const INPUT_FILE = '05.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8').trim();

const react = (data) => {
  for (let i = 1; i < data.length; i++) {
    if (Math.abs(data.charCodeAt(i - 1) - data.charCodeAt(i)) === 32) {
      data = data.substr(0, i - 1) + data.substr(i + 1);
      i = i - 2;
    }
  }
  return data;
}

const reduce = (data, polymer) =>
  data.replace(new RegExp(polymer, 'gi'), '');

let best = {
  polymer: 'A',
  size: react(reduce(data, 'A')).length,
};

const main = () => {
  for (let i = 'B'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    const polymer = String.fromCharCode(i);
    const size = react(reduce(data, polymer)).length;
    if (size < best.size) {
      best = {
        polymer,
        size,
      };
    }
  }
  console.log(best);
}

main();

