import main from '../utils/main.js';

const DEBUG_MODE = false;

function flipInput(input) {
  // The elegant part of the solution is here;
  // we can use matrix math to flip the input
  // along an inverse X/Y axis;
  // when this happens, the numbers are instantly
  // written in the order we need!
  let newInput = '';
  const lines = input.split('\n');
  for (let x = 0; x < lines[0].length; x++) {
    for (let y = 0; y < lines.length; y++) {
      newInput += lines[y][x];
    }
    newInput += '\n';
  }
  return newInput.trim();
}

function parseInput(input) {
  const flippedInput = flipInput(input);

  const lines = flippedInput.split(/\n\s+\n/);
  const data = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const tokens = line.split('\n');
    // Extract the operation from the first token of each line
    const operation = tokens[0][tokens[0].length - 1];
    tokens[0] = tokens[0].substring(0, tokens[0].length - 1);
    data.push({
      operation,
      numbers: tokens.map(token => Number.parseInt(token.trim())),
    });
  }
  return data;
}

function performCalculation(numbers, operation) {
  if (operation === '+') {
    return numbers.reduce((sum, val) => sum + val, 0);
  } else if (operation === '*') {
    return numbers.reduce((product, val) => product * val, 1);
  } else {
    throw new Error(`Unknown operation ${operation}`);
  }
}

function calculateGrandTotal(data) {
  let sum = 0;
  for (const datum of data) {
    const { operation, numbers } = datum;
    const result = performCalculation(numbers, operation);
    if (DEBUG_MODE) {
      console.log(`Calculated ${i} at ${result}`);
    }
    sum += result;
  }
  return sum;
}

main(
  input => {
    const data = parseInput(input);
    const grandTotal = calculateGrandTotal(data);
    return grandTotal;
  },
  { stripWhitespace: false },
);
