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

const isVisible = (initialY, initialX, offsetY, offsetX, type, seats) => {
  let x = initialX + offsetX;
  let y = initialY + offsetY;
  const isInBounds = (y, x, seats) => x >= 0 && x < seats[0].length && y >= 0 && y < seats.length;
  while (isInBounds(y, x, seats) && seats[y][x] === FLOOR) {
    x += offsetX;
    y += offsetY;
  }
  if (isInBounds(y, x, seats)) {
    return seats[y][x] === type;
  }
  else {
    return false;
  }
};

const getVisibleSeats = (x, y, seats) => {
  let count = 0;
  if (y - 1 >= 0) {
    if (x - 1 >= 0) {
      count += isVisible(y, x, -1, -1, OCCUPIED_SEAT, seats) ? 1 : 0;
    }
    count += isVisible(y, x, -1, 0, OCCUPIED_SEAT, seats) ? 1 : 0;
    if (x + 1 < seats[y - 1].length) {
      count += isVisible(y, x, -1, 1, OCCUPIED_SEAT, seats) ? 1 : 0;
    }
  }
  if (y + 1 < seats.length) {
    if (x - 1 >= 0) {
      count += isVisible(y, x, 1, -1, OCCUPIED_SEAT, seats) ? 1 : 0;
    }
    count += isVisible(y, x, 1, 0, OCCUPIED_SEAT, seats) ? 1 : 0;
    if (x + 1 < seats[y + 1].length) {
      count += isVisible(y, x, 1, 1, OCCUPIED_SEAT, seats) ? 1 : 0;
    }
  }
  if (x - 1 >= 0) {
    count += isVisible(y, x, 0, -1, OCCUPIED_SEAT, seats) ? 1 : 0;
  }
  if (x + 1 < seats[y].length) {
    count += isVisible(y, x, 0, 1, OCCUPIED_SEAT, seats) ? 1 : 0;
  }
  return count;
};

const life = seats => {
  const visibleSeats = [];
  const newSeats = clone(seats);
  for (let y = 0; y < seats.length; y++) {
    visibleSeats[y] = [];
    for (let x = 0; x < seats[y].length; x++) {
      visibleSeats[y].push(getVisibleSeats(x, y, seats));
    }
  }
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[y].length; x++) {
      if (seats[y][x] === EMPTY_SEAT && visibleSeats[y][x] === 0) {
        newSeats[y][x] = OCCUPIED_SEAT;
      }
      else if (seats[y][x] === OCCUPIED_SEAT && visibleSeats[y][x] >= 5) {
        newSeats[y][x] = EMPTY_SEAT;
      }
    }
  }
  return newSeats;
};

const runPart2 = seats => {
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

module.exports = runPart2;
