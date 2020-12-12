const main = require('../utils/main.js');

const move = (pos, x, y) => ({
  x: pos.x + x,
  y: pos.y + y,
});

const runPart1 = instructions => {
  let pos = { x: 0, y: 0 };
  let offset = { x: 1, y: 0 };

  instructions.forEach(({ op, val }) => {
    switch (op) {
      case 'L':
        for (let i = 0; i < val; i += 90) {
          if (offset.x !== 0) {
            offset = {
              x: 0,
              y: offset.x,
            };
          }
          else {
            offset = {
              x: offset.y * -1,
              y: 0,
            };
          }
        }
        break;

      case 'R':
        for (let i = 0; i < val; i += 90) {
          if (offset.x !== 0) {
            offset = {
              x: 0,
              y: offset.x * -1,
            };
          }
          else {
            offset = {
              x: offset.y,
              y: 0,
            };
          }
        }
        break;

      case 'N':
        pos = move(pos, 0, val);
        break;

      case 'S':
        pos = move(pos, 0, -1 * val);
        break;

      case 'E':
        pos = move(pos, val, 0);
        break;

      case 'W':
        pos = move(pos, -1 * val, 0);
        break;

      case 'F':
        pos = move(pos, offset.x * val, offset.y * val);
        break;

      default:
        throw new Error(`Unknown op ${op} (val=${val})`);
    }
  });
  return ({
    pos,
    dist: Math.abs(pos.x) + Math.abs(pos.y),
  })
};

const moveToWaypoint = (pos, waypoint, steps) => {
  const newPos = { ...pos };
  for (let step = 0; step < steps; step++) {
    newPos.x += waypoint.x;
    newPos.y += waypoint.y;
  }
  return newPos;
};

const runPart2 = instructions => {
  let pos = {
    x: 0,
    y: 0,
  };
  let waypoint = {
    x: 10,
    y: 1,
  };

  instructions.forEach(({ op, val }) => {
    switch (op) {
      case 'L':
        for (let i = 0; i < val; i += 90) {
          waypoint = {
            x: waypoint.y * -1,
            y: waypoint.x,
          };
        }
        break;

      case 'R':
        for (let i = 0; i < val; i += 90) {
          waypoint = {
            x: waypoint.y,
            y: waypoint.x * -1,
          };
        }
        break;

      case 'N':
        waypoint = move(waypoint, 0, val);
        break;

      case 'S':
        waypoint = move(waypoint, 0, -1 * val);
        break;

      case 'E':
        waypoint = move(waypoint, val, 0);
        break;

      case 'W':
        waypoint = move(waypoint, -1 * val, 0);
        break;

      case 'F':
        pos = moveToWaypoint(pos, waypoint, val);
        break;

      default:
        throw new Error(`Unknown op ${op} (val=${val})`);
    }
  });
  return ({
    pos,
    dist: Math.abs(pos.x) + Math.abs(pos.y),
  })
};

main(input => {
  const instructions = input
    .split('\n')
    .map(x => ({
      op: x[0],
      val: Number(x.substring(1)),
    }));
  return {
      part1: runPart1(instructions),
      part2: runPart2(instructions),
  };
});
