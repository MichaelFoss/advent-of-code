(() => {

let freq = 0;
let prev = [];
let index = 0;
const MAX = 200000;
let counter = 0;
do {
  counter++;
  prev.push(freq);
  freq += data[index];
  index++;
  if (index === data.length) {
    index = 0;
  }
} while (!prev.includes(freq) && counter < MAX);
console.log(`${counter}: ${freq}`);

})();
