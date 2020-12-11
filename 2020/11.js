const main = require('../utils/main.js');
const runPart1 = require('./11.part1.js');
const runPart2 = require('./11.part2.js');

main(input => {
    const seats = input
      .split('\n')
      .map(line => line.split(''));
    return {
        part1: runPart1(seats),
        part2: runPart2(seats),
    };
});
