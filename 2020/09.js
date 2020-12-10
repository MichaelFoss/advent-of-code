const main = require('../utils/main.js');

const DEBUG = false;

const isValid = (numIndex, preamble, nums) => {
    const number = nums[numIndex];
    for (let i = numIndex - preamble; i < numIndex; i++) {
        for (let j = i + 1; j < numIndex; j++) {
            if (nums[i] + nums[j] === number) {
                return true;
            }
        }
    }
    return false;
};

const findFirstInvalidNumberIndex = (nums, preamble) => {
    for (let i = preamble; i < nums.length; i++) {
        if (!isValid(i, preamble, nums)) {
            return i;
        }
    }
    return undefined;
};

const sumRangeEquals = (nums, start, end, target) => {
    const debugLines = [];
    for (let i = start; i < end; i++) {
        let sum = nums[i];
        if (DEBUG) {
            debugLines.push(`  ${i}: ${sum}`);
        }
        for (let j = i + 1; j <= end && sum < target; j++) {
            if (DEBUG) {
                debugLines.push(`    ${i}..${j}: ${sum} + ${nums[j]} = ${sum + nums[j]}`);
            }
            sum += nums[j];
            if (sum === target) {
                if (DEBUG) {
                    debugLines.unshift(`sumRangeEquals(${start}-${end}) ?== ${target} --> true`);
                    console.log(debugLines.join('\n'));
                }
                return { start: i, end: j };
            }
        }
    }
    if (DEBUG) {
        debugLines.unshift(`sumRangeEquals(${start}-${end}) ?== ${target} --> false`);
        console.log(debugLines.join('\n'));
    }
    return {};
}

const sumOfLargestAndSmallest = (start, end, nums) => {
    let max = nums[start];
    let min = nums[start];
    for (let i = start + 1; i <= end; i++) {
        min = Math.min(min, nums[i]);
        max = Math.max(max, nums[i]);
    }
    return min + max;
};

const findEncryptionWeakness = (invalidNumberIndex, nums) => {
    const invalidNumber = nums[invalidNumberIndex];
    for (let i = 0; i < invalidNumberIndex; i++) {
        for (let j = i + 1; j < invalidNumberIndex; j++) {
            const { start, end } = sumRangeEquals(nums, i, j, invalidNumber);
            if (start !== end) {
                return sumOfLargestAndSmallest(start, end, nums);
            }
        }
    }
    return undefined;
};

main(input => {
    const lines = input
        .split('\n');
    const preamble = Number(lines.shift().split(' = ')[1]);
    const nums = lines
        .map(x => Number(x));
    const invalidNumberIndex = findFirstInvalidNumberIndex(nums, preamble);
    return {
        part1: nums[invalidNumberIndex],
        part2: findEncryptionWeakness(invalidNumberIndex, nums),
    };
});
