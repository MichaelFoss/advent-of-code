import main from '../utils/main.js';

const DEBUG_MODE = false;

function getMaxJoltage(bank) {
  const batteries = bank.split('');
  let maxFirst = -1;
  let maxSecond = -1;
  // O(n log n) I think
  for (let i = 0; i < batteries.length - 1; i++) {
    if (batteries[i] > maxFirst) {
      maxFirst = batteries[i];
      maxSecond = -1;
      for (let j = i + 1; j < batteries.length; j++) {
        maxSecond = Math.max(batteries[j], maxSecond);
        if (maxSecond === 9) {
          j = batteries.length;
        }
      }
    }
  }
  const maxJoltage = maxFirst * 10 + maxSecond;
  if (DEBUG_MODE) {
    console.log(`[${bank}]: ⚡️${maxJoltage}`);
  }
  return maxJoltage;
}

main((input) => {
  const banks = input.split('\n');
  let joltage = 0;
  for (const bank of banks) {
    joltage += getMaxJoltage(bank);
  }
  return joltage;
});
