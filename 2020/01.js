const main = require('../utils/main.js');

const TARGET_SUM = 2020;

const findSumOf2 = numbers => {
  let num1, num2;
  let isFound = false;
  for (let i = 0; i < numbers.length && !isFound; i++) {
    num1 = numbers[i];
    for (let j = i + 1; j < numbers.length && !isFound; j++) {
      num2 = numbers[j];
      isFound = num1 + num2 === TARGET_SUM;
    }
  }
  if (!isFound) {
    return -1;
  }
  return num1 * num2;
};

const findSumOf3 = numbers => {
  let nums = [];
  let isFound = false;
  for (let i = 0; i < numbers.length && !isFound; i++) {
    nums[0] = numbers[i];
    for (let j = i + 1; j < numbers.length && !isFound; j++) {
      nums[1] = numbers[j];
      for (let k = j + 1; k < numbers.length && !isFound; k++) {
        nums[2] = numbers[k];
        isFound = nums.reduce((sum, curr) => sum + curr, 0) === TARGET_SUM;
      }
    }
  }
  if (!isFound) {
    return -1;
  }
  return nums.reduce((product, curr) => product * curr, 1);
};

main(input => {
  const numbers = input
    .split('\n')
    .map(x => Number(x));
  return {
    sumOf2: findSumOf2(numbers),
    sumOf3: findSumOf3(numbers),
  };
});

