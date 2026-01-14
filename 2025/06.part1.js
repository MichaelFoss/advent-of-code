import main from '../utils/main.js';

const DEBUG_MODE = false;

function getTokens(line) {
  return line.split(/\s+/).filter((token) => token.trim().length > 0);
}

function parseInput(input) {
  const lines = input.split('\n');
  const lastLine = lines[lines.length - 1];
  const operations = getTokens(lastLine);
  const allNumbers = new Array(operations.length).fill([]).map((x) => [...x]);

  for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
    const line = lines[lineIndex];
    if (lineIndex === lines.length - 1) {
    } else {
      const tokens = getTokens(line);
      if (DEBUG_MODE) {
        console.log(tokens);
      }
      for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
        const number = Number.parseInt(tokens[tokenIndex]);
        allNumbers[tokenIndex].push(number);
      }
    }
  }

  return { allNumbers, operations };
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

function calculateGrandTotal(allNumbers, operations) {
  let sum = 0;
  for (let i = 0; i < operations.length; i++) {
    const numbers = allNumbers[i];
    const operation = operations[i];
    const result = performCalculation(numbers, operation);
    if (DEBUG_MODE) {
      console.log(`Calculated ${i} at ${result}`);
    }
    sum += result;
  }
  return sum;
}

main((input) => {
  const { allNumbers, operations } = parseInput(input);
  const grandTotal = calculateGrandTotal(allNumbers, operations);
  return grandTotal;
});
