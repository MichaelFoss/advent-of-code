// Part 1
(() => {

let i = 0, count = 0;
do {
  const instruction = data[i];
  data[i]++;
  i += instruction;
  count++;
} while (i < data.length);
console.log(`i = ${i}; count = ${count}`);

})();

// Part 2
(() => {

let i = 0, count = 0;
do {
  const instruction = data[i];
  if (instruction >= 3) {
    data[i]--;
  }
  else {
    data[i]++;
  }
  i += instruction;
  count++;
} while (i < data.length);
console.log(`i = ${i}; count = ${count}`, data);

})();
