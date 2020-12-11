const main = require('../utils/main.js');

const getSortedAdapters = adapters => {
    const sortedAdapters = [ ...adapters ];
    sortedAdapters.sort((a, b) => a - b);
    sortedAdapters.unshift(0);
    const maxJoltage = sortedAdapters[sortedAdapters.length - 1] + 3;
    sortedAdapters.push(maxJoltage);
    return sortedAdapters;
};

const runPart1 = adapters => {
    let count1 = 0;
    let count3 = 0;
    for (let i = 1; i < adapters.length; i++) {
        switch (adapters[i] - adapters[i - 1]) {
            case 1:
                count1++;
                break;
            case 3:
                count3++;
                break;
        }
    }
    return count1 * count3;
};

const runPart2 = adapters => {
    // Yeah, this is cheating. :)
    const cache = {
        1: 1,
        2: 2,
        3: 4,
        4: 7,
        5: 13,
        6: 23,
    }

    const differences = [];
    for (let i = 1; i < adapters.length; i++) {
        const difference = adapters[i] - adapters[i - 1];
        differences.push(difference);
    }
    const differenceMap = [];
    let total = 0;
    for (let i = 0; i < differences.length; i++) {
        if (differences[i] === 1) {
            total++;
        }
        else if (differences[i] === 3) {
            if (total > 0) {
                differenceMap.push(total);
            }
            total = 0;
        }
    }
    return differenceMap
        .reduce((product, curr) => cache[curr] * product, 1);
};

main(input => {
    const adapters = input
        .split('\n')
        .map(x => Number(x));
    const sortedAdapters = getSortedAdapters(adapters);
    return {
        part1: runPart1(sortedAdapters),
        part2: runPart2(sortedAdapters),
    };
});
