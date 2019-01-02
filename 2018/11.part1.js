const INPUT = 3628;

const GRID_MAX_X = 300;
const GRID_MAX_Y = 300;

const getPowerLevel = (x, y, serialNumber) => {
  const rackID = x + 10;
  let powerLevel = rackID * y;
  powerLevel += serialNumber;
  powerLevel *= rackID;
  powerLevel = Math.floor(powerLevel / 100) % 10;
  powerLevel -= 5;
  return powerLevel;
}

const buildGrid = (maxX, maxY, serialNumber) => {
  const grid = [];
  for (let y = 1; y <= maxY; y++) {
    grid.push([]);
    for (let x = 1; x <= maxX; x++) {
      grid[y - 1].push(getPowerLevel(x, y, serialNumber));
    }
  }
  return grid;
}

const getSectionPower = (grid, topLeftX, topLeftY) => {
  let power = 0;
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      power += grid[topLeftY + y][topLeftX + x];
    }
  }
  return power;
}

const getBestPower = grid => {
  let maxPower = -99;
  let maxX = 1;
  let maxY = 1;
  for (let y = 1; y < GRID_MAX_Y - 2; y++) {
    for (let x = 1; x < GRID_MAX_X - 2; x++) {
      const power = getSectionPower(grid, x - 1, y - 1);
      if (power > maxPower) {
        maxPower = power;
        maxX = x;
        maxY = y;
      }
    }
  }
  return {
    x: maxX,
    y: maxY,
    power: maxPower,
  };
}

const main = (serialNumber) => {
  const grid = buildGrid(GRID_MAX_X, GRID_MAX_Y, serialNumber);
  return getBestPower(grid);
  // Other test data
  return [
    getBestPower(buildGrid(GRID_MAX_X, GRID_MAX_Y, 18)), // 29 @ 33,45
    getBestPower(buildGrid(GRID_MAX_X, GRID_MAX_Y, 42)), // 30 @ 21,61
  ];
  // Test data
  return [
    getPowerLevel(122, 79, 57), // -5
    getPowerLevel(217, 196, 39), // 0
    getPowerLevel(101, 153, 71), // 4
  ];
}

console.log(main(INPUT));

