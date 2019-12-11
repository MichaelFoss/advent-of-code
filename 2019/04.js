const fs = require('fs');

// ?
const [ MIN, MAX ] = [ 235741, 706948 ];

const hasDuplicateDigit = num => {
  const numStr = num.toString();
  for (let i = 0; i < numStr.length - 1; i++) {
    const matches = numStr[i] === numStr[i + 1];
    switch (i) {
      case 0:
        if (matches && numStr[i + 1] !== numStr[i + 2]) {
          return true;
        }
        break;

      case 4:
        if (matches && numStr[i - 1] !== numStr[i]) {
          return true;
        }
        break;

      default:
        if (matches && numStr[i - 1] !== numStr[i] && numStr[i + 1] !== numStr[i + 2]) {
          return true;
        }
    }
  }
  return false;
};

const constantlyIncreases = num => {
  const numStr = num.toString();
  for (let i = 0; i < numStr.length - 1; i++) {
    if (numStr[i] > numStr[i + 1]) {
      return false;
    }
  }
  return true;
};

const isValid = num =>
  hasDuplicateDigit(num) &&
  constantlyIncreases(num);

const main = (min, max) => {
    validCount = 0;

    for (let i = min; i <= max; i++) {
      if (isValid(i)) {
        validCount++;
      }
    }

    return validCount;
};

console.log(main(MIN, MAX));

