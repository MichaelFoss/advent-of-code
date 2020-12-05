const main = require('../utils/main.js');

const getRow = s => {
  let bottom = 0;
  let top = 127;
  for (let i = 0; i < 7; i++) {
    if (s[i] === 'F') {
      top = Math.floor((top + bottom) / 2);
    }
    else {
      bottom = Math.ceil((top + bottom) / 2);
    }
  }
  return bottom;
}

const getColumn = s => {
  let bottom = 0;
  let top = 7;
  s = s.substring(7);
  for (let i = 0; i < 3; i++) {
    if (s[i] === 'L') {
      top = Math.floor((top + bottom) / 2);
    }
    else {
      bottom = Math.ceil((top + bottom) / 2);
    }
  }
  return bottom;
}

const getMissingSeat = seatIds => {
  let missingSeat = undefined;
  for (let i = seatIds[8]; missingSeat === undefined && i < seatIds[seatIds.length - 8]; i++) {
    if (!seatIds.includes(i)) {
      missingSeat = i;
    }
  }
  return missingSeat;
}

main(input => {
  const rowStrings = input.split('\n');
  const seatIds = rowStrings.map(s => Number(getRow(s) * 8 + getColumn(s)));
  seatIds.sort((a, b) => a - b);
  return {
    part1: seatIds.reduce((max, curr) => curr > max ? curr : max, -1),
    part2: getMissingSeat(seatIds),
  };
});
