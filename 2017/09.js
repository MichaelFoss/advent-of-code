(() => {

const input = window.localStorage.input;

let data = input.split('');
let garbageCount = 0;

// Collect the garbage
let i = 0;
while (i < data.length) {
  if (data[i] === '<') {
    data.splice(i, 1);
    while (data[i] !== '>') {
      while (data[i] === '!') {
        data.splice(i, 2);
      }
      if (data[i] !== '>') {
        garbageCount++;
        data.splice(i, 1);
      }
    }
  }
  if (data[i] === '>') {
    data.splice(i, 1);
  }
  else {
    i++;
  }
}

data = data.join('').replace(/\,/g, '');

let sum = 0;
for (let i = 0, currentValue = 0; i < data.length; i++) {
  if (data[i] === '{') {
    currentValue++;
  }
  else {
    sum += currentValue;
    currentValue--;
  }
}

console.log(`Garbage collected: ${garbageCount}; total groups: ${sum}`);

})();
