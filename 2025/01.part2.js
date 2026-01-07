import main from '../utils/main.js';

const STARTING_POSITION = 50;
const DEBUG_MODE = true;

const DIRECTION_LEFT = -1;
const DIRECTION_RIGHT = 1;

function performOperation(position, zeroesCount, operation) {
  if (operation.length === 0) {
    return;
  }
  const operationLetter = operation[0];
  if (!['L', 'R'].includes(operationLetter)) {
    return;
  }
  const direction = operationLetter === 'L' ? DIRECTION_LEFT : DIRECTION_RIGHT;
  let movement = Number.parseInt(operation.substring(1));
  const originalPosition = position;

  // Yes, this is admittedly a horrible solution, but oh well.
  // The other ones didn't work, and this one did.
  while (movement > 0) {
    position += direction;
    movement--;
    if (position === 0) {
      zeroesCount++;
    }
    else if (position === -1) {
      position = 99;
    }
    else if (position === 100) {
      position = 0;
      zeroesCount++;
    }
  }
  return [ position, zeroesCount ];
}

main(input => {
  let position = STARTING_POSITION;
  let zeroesCount = 0;
  const operations = input.split('\n');
  if (DEBUG_MODE) {
    console.log(`Starting at 50, performing ${operations.length} operations`);
  }
  for (let i = 0; i < operations.length; i++) {
    [ position, zeroesCount ] = performOperation(position, zeroesCount, operations[i]);
    if (DEBUG_MODE) {
      console.log(`[${operations[i]}] -> ${position} (${zeroesCount})`);
    }
  }
  return zeroesCount;
});

