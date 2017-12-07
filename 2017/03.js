(() => {

const target = 312051;
const data = [
  [25,23,11],
  [1,1,10],
  [2,4,5],
];

let middle = 1;
do {
  let next, x, y;
  middle++;
  // Top
  data.unshift([]);
  // Bottom
  data.push([]);

  // Below top-left
  x = 0;
  y = 1;
  next =
    data[y + 0][x + 1 - 1 /* doesn't exist yet */] +
    data[y + 1][x + 1 - 1 /* doesn't exist yet */];
  data[1].unshift(next);

  // Left
  for (let i = 2; i <= data.length - 3; i++) {
    x = 0;
    y = i;
    next =
      data[y - 1][x + 0] +
      data[y - 1][x + 1] +
      data[y + 0][x + 1 - 1 /* doesn't exist yet */] +
      data[y + 1][x + 1 - 1 /* doesn't exist yet */];
    data[i].unshift(next);
  }

  // Top of bottom-left
  x = 0;
  y = data.length - 2;
  next =
    data[y - 1][x + 0] +
    data[y - 1][x + 1] +
    data[y + 0][x + 1 - 1 /* doesn't exist yet */];
  data[y].unshift(next);

  // Bottom-left
  x = 0;
  y = data.length - 1;
  next =
    data[y - 1][x + 0] +
    data[y - 1][x + 1];
  data[y].push(next);

  // Bottom
  for (let i = 1; i < data[data.length - 2].length - 1; i++) {
    x = i;
    y = data.length - 1;
    next =
      data[y - 0][x - 1] +
      data[y - 1][x - 1] +
      data[y - 1][x - 0] +
      data[y - 1][x + 1];
    data[y].push(next);
  }

  // Left of bottom-right
  x = data[data.length - 1].length;
  y = data.length - 1;
  next =
    data[y - 0][x - 1] +
    data[y - 1][x - 1] +
    data[y - 1][x - 0];
  data[y].push(next);

  // Bottom-right
  x = data[data.length - 1].length;
  y = data.length - 1;
  next =
    data[y - 0][x - 1] +
    data[y - 1][x - 1];
  data[y].push(next);

  // Right
  for (let i = data.length - 2; i >= 2; i--) {
    x = data[i].length;
    y = i;
    next =
      data[y + 1][x - 0] +
      data[y + 1][x - 1] +
      data[y + 0][x - 1] +
      data[y - 1][x - 1];
    data[y].push(next);
  }

  // Below top-right
  x = data[1].length;
  y = 1;
  next =
    data[y + 1][x - 0] +
    data[y + 1][x - 1] +
    data[y + 0][x - 1];
  data[y].push(next);

  // Top-right
  x = data[1].length - 1;
  y = 0;
  next =
    data[y + 1][x - 0] +
    data[y + 1][x - 1];
  data[y].unshift(next);

  // Top
  for (let i = data[1].length - 2; i > 0; i--) {
    x = i;
    y = 0;
    next =
      data[y + 0][0] +
      data[y + 1][x + 1] +
      data[y + 1][x + 0] +
      data[y + 1][x - 1];
    data[y].unshift(next);
  }

  // Top-left
  x = 0;
  y = 0;
  next =
    data[y + 0][0] +
    data[y + 1][x + 1] +
    data[y + 1][x + 0];
  data[y].unshift(next);
} while (data[0][0] <= target);

console.log(data.map(row => row.join(',')).join('!\n') + '!');

// From here on out, it's some Excel magic...

})();
