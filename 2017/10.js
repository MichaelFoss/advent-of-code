// Part 1
(() => {

const listSize = 256;
const lengths = `157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30`.split(',').map(x => parseInt(x));
//const listSize = 5;
//const lengths = `3,4,1,5`.split(',').map(x => parseInt(x));
const data = [];
for (let i = 0; i < listSize; i++) {
  data[i] = i;
}

function reverseSublist(data, pos, length) {
  for (let i = 0; i < pos; i++) {
    data.push(data.shift());
  }
  const subList = data.splice(0, length).reverse();
  data.splice(0, 0, ...subList);
  for (let i = 0; i < pos; i++) {
    data.unshift(data.pop());
  }
}

function incrementPos(pos, length, skipSize) {
  pos += length + skipSize;
  if (pos >= listSize) {
    pos -= listSize;
  }
  return pos;
}

let pos = 0;
let skipSize = 0;

for (let lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
  reverseSublist(data, pos, lengths[lengthIndex]);
  pos = incrementPos(pos, lengths[lengthIndex], skipSize);
  skipSize++;
}
console.log(data);

})();


// Part 2
(() => {

const listSize = 256;
const lengths = `157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30`.split('').map(x => x.charCodeAt(0));
// const lengths = ``.split('').map(x => x.charCodeAt(0)); // a2582a3a0e66e6e86e3812dcb672a272
lengths.push(...[17, 31, 73, 47, 23]);
const data = [];
for (let i = 0; i < listSize; i++) {
  data[i] = i;
}

function reverseSublist(data, pos, length) {
  for (let i = 0; i < pos; i++) {
    data.push(data.shift());
  }
  const subList = data.splice(0, length).reverse();
  data.splice(0, 0, ...subList);
  for (let i = 0; i < pos; i++) {
    data.unshift(data.pop());
  }
}

function incrementPos(pos, length, skipSize) {
  pos += length + skipSize;
  while (pos >= listSize) {
    pos -= listSize;
  }
  return pos;
}

let pos = 0;
let skipSize = 0;

for (let round = 0; round < 64; round++) {
  for (let lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
    reverseSublist(data, pos, lengths[lengthIndex]);
    pos = incrementPos(pos, lengths[lengthIndex], skipSize);
    skipSize++;
  }
}

for (let i = 0; i < 16; i++) {
  const arrToXor = data.splice(0, 16);
  data.push(arrToXor.reduce((accumulator, currentValue) => accumulator ^ currentValue));
}

const result = data.reduce((accumulator, currentValue) => accumulator + (currentValue < 16 ? '0' : '') + currentValue.toString(16), '');

console.log(result);

})();

