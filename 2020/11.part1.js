const FLOOR = '.';
const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';

const clone = rows => ([
  ...(rows.map(rowSeats => ([ ...rowSeats ])))
]);

const toString = rows =>
  rows
    .map(rowSeats => rowSeats.join(''))
    .join('\n');

const countSeats = (seats, type) => {
  let count = 0;
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[y].length; x++) {
      if (seats[y][x] === type) {
        count++;
      }
    }
  }
  return count;
}

const isSame = (a, b) => {
  for (let y = 0; y < a.length; y++) {
    for (let x = 0; x < a[y].length; x++) {
      if (a[y][x] !== b[y][x]) {
        return false;
      }
    }
  }
  return true;
}

const getAdjacentSeats = (x, y, seats) => {
  let count = 0;
  if (y - 1 >= 0) {
    if (x - 1 >= 0) {
      count += seats[y - 1][x - 1] === OCCUPIED_SEAT ? 1 : 0;
    }
    count += seats[y - 1][x] === OCCUPIED_SEAT ? 1 : 0;
    if (x + 1 < seats[y - 1].length) {
      count += seats[y - 1][x + 1] === OCCUPIED_SEAT ? 1 : 0;
    }
  }
  if (y + 1 < seats.length) {
    if (x - 1 >= 0) {
      count += seats[y + 1][x - 1] === OCCUPIED_SEAT ? 1 : 0;
    }
    count += seats[y + 1][x] === OCCUPIED_SEAT ? 1 : 0;
    if (x + 1 < seats[y + 1].length) {
      count += seats[y + 1][x + 1] === OCCUPIED_SEAT ? 1 : 0;
    }
  }
  if (x - 1 >= 0) {
    count += seats[y][x - 1] === OCCUPIED_SEAT ? 1 : 0;
  }
  if (x + 1 < seats[y].length) {
    count += seats[y][x + 1] === OCCUPIED_SEAT ? 1 : 0;
  }
  return count;
};

const life = seats => {
  const adjacentSeats = [];
  const newSeats = clone(seats);
  for (let y = 0; y < seats.length; y++) {
    adjacentSeats[y] = [];
    for (let x = 0; x < seats[y].length; x++) {
      adjacentSeats[y].push(getAdjacentSeats(x, y, seats));
    }
  }
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[y].length; x++) {
      if (seats[y][x] === EMPTY_SEAT && adjacentSeats[y][x] === 0) {
        newSeats[y][x] = OCCUPIED_SEAT;
      }
      else if (seats[y][x] === OCCUPIED_SEAT && adjacentSeats[y][x] >= 4) {
        newSeats[y][x] = EMPTY_SEAT;
      }
    }
  }
  return newSeats;
};

const runPart1 = seats => {
  let oldSeats;
  let newSeats = clone(seats);
  let i = 0;
  do {
    oldSeats = clone(newSeats);
    newSeats = life(newSeats);
    i++;
  } while (!isSame(oldSeats, newSeats));
  return {
    iterations: i,
    occupiedSeats: countSeats(newSeats, OCCUPIED_SEAT),
  };
}

module.exports = runPart1;
