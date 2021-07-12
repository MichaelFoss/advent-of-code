const main = require('../utils/main.js');
const { log1, log2 } = require('../utils/log.js');

process.env.DEBUG = 0;

const removeCups = (cups, index) => cups.splice(index, 3);

const findCupIndex = (cups, cupToFind, minCup, maxCup) => {
    let index;
    do {
        index = cups.find(x => x === cupToFind);
        if (index === undefined) {
            cupToFind--;
            if (cupToFind < minCup) {
                cupToFind = maxCup;
            }
        }
    } while (index === undefined);
    return index;
}

const insertCups = (cups, destination, cupsToInsert) => {
    const destinationIndex = cups.findIndex(x => x === destination) + 1;
    log2(`  inserting ${cupsToInsert.join(', ')} into ${cupsToString(cups)} at index ${destinationIndex}`);
    cups.splice(destinationIndex, 0, ...cupsToInsert);
    log2(`  ${cupsToString(cups)}`);
};

const cupsToString = cups => cups
    .map((cup, cupIndex) => cupIndex === 0 ? `(${cup})` : cup)
    .join(' ');

const runPart1 = (initialCups, maxRuns, minCup, maxCup, logOnRunNumber = undefined) => {
    const cups = [ ...initialCups ];
    for (let i = 0; i < maxRuns; i++) {
        if (i % logOnRunNumber === 0) {
            console.log(`Run #${i}`);
        }
        log1();
        log1(`-- move ${i + 1} --`);
        log1(`cups: ${cupsToString(cups)}`);
        const removedCups = removeCups(cups, 1);
        log2(`pick up: ${removedCups.join(', ')}`);
        const cupIndex = findCupIndex(cups, cups[0] - 1, minCup, maxCup);
        log2(`destination: ${cupIndex}`);
        insertCups(cups, cupIndex, removedCups);
        cups.push(cups.shift());
    }
    return cups.join('');
};

main(input => {
    const cups = input
        .split('')
        .map(x => Number(x));
    const oneMillionCups = [
        ...cups,
    ];
    for (let i = Math.max(...cups); i <= 1e6; i++) {
        oneMillionCups.push(i);
    }
    return {
        part1: runPart1(cups, 100, 1, Math.max(...cups)),
        part2: runPart1(oneMillionCups, 1e7, 1, 1e6, 1e1),
    };
})