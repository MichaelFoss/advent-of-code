const fs = require('fs');

const INPUT_FILE = '05.input.txt';
// const INPUT_FILE = '05.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8').trim();

const main = (data) => {
  for (let i = 1; i < data.length; i++) {
    if (Math.abs(data.charCodeAt(i - 1) - data.charCodeAt(i)) === 32) {
      data = data.substr(0, i - 1) + data.substr(i + 1);
      i = i - 2;
    }
  }
  return data.length;
}

console.log(main(data));

