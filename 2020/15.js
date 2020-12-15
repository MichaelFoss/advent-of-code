const main = require('../utils/main.js');

const getNthNumber = (nums, maxNumbers) => {
    const speaks = {};
    for (let i = 0; i < nums.length; i++) {
        speaks[nums[i]] = {
            prev1: i,
            prev2: undefined,
        };
    }
    let lastNum = Object.keys(speaks).pop();
    for (let i = nums.length; i < maxNumbers; i++) {
        if (speaks[lastNum].prev2 === undefined) {
            // speak 0
            lastNum = 0;
        }
        else {
            // speak diff
            lastNum = speaks[lastNum].prev1 - speaks[lastNum].prev2;
        }
        speaks[lastNum] = {
            prev1: i,
            prev2: speaks[lastNum]?.prev1,
        };
}
    return lastNum;
};

main(input => {
    const nums = input
        .split(',')
        .map(x => Number(x));
    return {
        part1: getNthNumber(nums, 2020),
        part2: getNthNumber(nums, 30000000),
    };
});
