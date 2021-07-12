const main = require('../utils/main.js');

const generateInitialState = input => {
    const state = input;
    return state;
};

const runPart1 = state => {
    return state;
};

main(input => {
    const state = generateInitialState(input);
    return {
        part1: runPart1(state),
        part2: '',//runPart2(state),
    };
})