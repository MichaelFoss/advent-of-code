import main from '../utils/main.js';

const DEBUG_MODE = false;
const BATTERY_COUNT = 12;

/**
 * @param {number[]} batteries
 * @param {number} batteryCount
 * @returns {number}
 */
function getMaxJoltage(batteries, batteryCount) {
  let maxBatteryIndex = 0;
  for (let i = 1; i <= batteries.length - batteryCount; i++) {
    if (batteries[i] > batteries[maxBatteryIndex]) {
      maxBatteryIndex = i;
    }
  }
  let maxJoltage = batteries[maxBatteryIndex] * Math.pow(10, batteryCount - 1);
  if (batteryCount > 1) {
    const newBatteries = batteries.slice(maxBatteryIndex + 1);
    if (DEBUG_MODE) {
      console.log(
        `  [${batteryCount}]: idx=${maxBatteryIndex} (${
          batteries[maxBatteryIndex]
        }) @ [${batteries.join('')}] => [${newBatteries.join('')}]`
      );
    }
    // Sanity check
    if (newBatteries.length < batteryCount - 1) {
      throw new Error(
        `newBatteries.length(${newBatteries.length}) < batteryCount - 1(${batteryCount})`
      );
    }
    maxJoltage += getMaxJoltage(newBatteries, batteryCount - 1);
    if (DEBUG_MODE && batteryCount === BATTERY_COUNT) {
      console.log(`[${batteries.join('')}]: ⚡️${maxJoltage}`);
    }
  }
  return maxJoltage;
}

main((input) => {
  const banks = input.split('\n');
  let joltage = 0;
  for (const bank of banks) {
    const batteries = bank.split('').map((c) => Number.parseInt(c));
    if (DEBUG_MODE) {
      console.log(`Bank: ${batteries.join('')}`);
    }
    joltage += getMaxJoltage(batteries, BATTERY_COUNT);
  }
  return joltage;
});
