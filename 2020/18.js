const main = require('../utils/main.js');
const { log } = require('../utils/log.js');

// process.env.DEBUG = 0;

OPERATOR_ADD = '+';
OPERATOR_MULTIPLY = '*';
PARENTHESES_OPEN = '(';
PARENTHESES_CLOSED = ')';

const isOpenParen = char => char === PARENTHESES_OPEN;
const isClosedParen = char => char === PARENTHESES_CLOSED;

const simplify = (operand1, operator, operand2) => {
  if (operator === OPERATOR_ADD) {
    return Number(operand1) + Number(operand2);
  }
  else if (operator === OPERATOR_MULTIPLY) {
    return Number(operand1) * Number(operand2);
  }
  else {
    throw new Error(`Unknown operator '${operator}`);
  }
}

const simplifyArr = (arr, prioritizeAddition = false) => {
  if (arr.length === 1) {
    return arr[0];
  }
  if (!prioritizeAddition) {
    while (arr.length > 1) {
      arr.splice(0, 3, simplify(arr[0], arr[1], arr[2]));
    }
    return arr[0];
  }
  else {
    log(`Prioritizing + in simplifyArr`);
    for (let i = 1; i < arr.length; i += 2) {
      log('  ' + arr.join(' ') + ' --> ');
      if (arr[i] === OPERATOR_ADD) {
        arr.splice(i - 1, 3, simplify(arr[i - 1], OPERATOR_ADD, arr[i + 1]));
        i -= 2;
      }
      log('    ' + arr.join(' '));
    }
    return simplifyArr(arr);
  }
}

const removeParentheses = (vals, prioritizeAddition) => {
  for (let open = vals.findIndex(x => x === PARENTHESES_OPEN); open !== -1; open = vals.findIndex(x => x === PARENTHESES_OPEN)) {
    let close = open + 1;
    log();
    log(vals.join(' '));
    while (!isClosedParen(vals[close])) {
      if (isOpenParen(vals[close])) {
        open = close;
      }
      close++;
    }
    log(`${open}-${close}`);
    log(`${vals.slice(open + 1, close).join(' ')} =`);
    const result = simplifyArr(vals.slice(open + 1, close), prioritizeAddition);
    log(result);
    vals.splice(open, close - open + 1, result);
    log(vals.join(' '));
  }
};

const solveLine = (line, prioritizeAddition) => {
  const vals = [...line];
  log('---------------');
  log(vals);
  log('---------------');
  removeParentheses(vals, prioritizeAddition);
  log(`Final resolution: ${vals.join(' ')}`);
  // At this point, it should be nothing but operators
  // (and if prioritizeAddition, nothing but addition)
  const result = simplifyArr(vals, prioritizeAddition);
  log(`Final solution: ${result}`);
  return result;
};

const sumEvals = (lines, prioritizeAddition = false) => {
  return lines
    .map(line => solveLine(line, prioritizeAddition))
    .reduce((sum, curr) => sum + curr, 0);
};

main(input => {
  const lines = input
    .split('\n')
    .map(x => x
      .split('')
      .filter(x => x !== ' ')
    );
  return ({
    part1: sumEvals(lines),
    part2: sumEvals(lines, true),
  });
});
