import main from '../utils/main.js';

const STARTING_POSITION = 50;
const DEBUG_MODE = true;

function performOperation(position, operation) {
  if (operation.length === 0) {
    return;
  }
  const operationLetter = operation[0];
  if (!['L', 'R'].includes(operationLetter)) {
    return;
  }
  const direction = operationLetter === 'L' ? -1 : 1;
  const movement = Number.parseInt(operation.substring(1)) * direction;
  position += movement;
  if (position < 0) {
    while (position < 0) {
      position += 100;
    }
  }
  else if (position > 99) {
    while (position > 99) {
      position -= 100;
    }
  }
  return position;
}

main(input => {
  let position = STARTING_POSITION;
  let zeroesCount = 0;
  const operations = input.split('\n');
  if (DEBUG_MODE) {
    console.log(`Starting at 50, performing ${operations.length} operations`);
  }
  for (let i = 0; i < operations.length; i++) {
    position = performOperation(position, operations[i]);
    if (position === 0) {
      zeroesCount++;
    }
    if (DEBUG_MODE) {
      console.log(`[${operations[i]}] -> ${position} (${zeroesCount})`);
    }
  }
  return zeroesCount;
});

