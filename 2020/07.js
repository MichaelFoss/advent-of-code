const main = require('../utils/main.js');

const SHINY_GOLD = 'shiny gold';

const hasBagWithColor = (bag, bagsList, color) => {
    if (bag.bags === null) {
        return false;
    }
    else {
        for (let childColor in bag.bags) {
            const childBag = bagsList.find(bag => bag.color === childColor);
            if (childBag.color === color) {
                return true;
            }
            else if (hasBagWithColor(childBag, bagsList, color)) {
                return true;
            }
        }
    }
    return false;
};

const countBagsInside = (bag, bagsList) => {
    const childBags = bag.bags;
    if (childBags === null) {
        return 0;
    }
    const childBagColors = Object.keys(childBags);
    let sum = 0;
    childBagColors
        .forEach(childBagColor => {
            const numberOfChildBagsRequired = bag.bags[childBagColor];
            const childBag = bagsList.find(bag => bag.color === childBagColor);
            sum += numberOfChildBagsRequired + numberOfChildBagsRequired * countBagsInside(childBag, bagsList);
        });
    return sum;
};

/**
 * Gets a bag from a string.
 * @param s
 * @returns {{color: string, bags: null|Object}}
 */
const getBagFromString = s => {
    s = s.trim();
    // light red
    // 1 bright white bag, 2 muted yellow bags.
    const parts = s.split(' bags contain ');
    const color = parts[0];
    if (parts[1] === 'no other bags.') {
        return {
            color,
            bags: null,
        };
    }
    const bags = parts[1]
        // 1 bright white bag, 2 muted yellow bags
        .substring(0, parts[1].length - '.'.length)
        // 1 bright white bag
        // 2 muted yellow bags
        .split(', ')
        // 1 bright white
        // 2 muted yellow
        .map(x => x.split(' bag')[0])
        // { 'bright white': 1 }
        // { 'muted yellow': 2 }
        .map(x => ({
            number: Number(x.substring(0, x.indexOf(' '))),
            color: x.substring(x.indexOf(' ') + 1),
        }))
        // {
        //   'bright white': 1,
        //   'muted yellow': 2,
        // }
        .reduce((bags, currBag) => ({
            ...bags,
            [currBag.color]: currBag.number,
        }), {})
    return {
        color,
        bags,
    };
}

main(input => {
    const lines = input.split('\n');
    const bagsList = lines.map(line => getBagFromString(line));
    const bagsWithGoldBags = bagsList
        .map(bag => hasBagWithColor(bag, bagsList, SHINY_GOLD))
        .filter(hasShinyGoldBag => hasShinyGoldBag)
        .length;
    const bagCountInsideGoldBag = countBagsInside(bagsList.find(bag => bag.color === SHINY_GOLD), bagsList);
    return {
        part1: bagsWithGoldBags,
        part2: bagCountInsideGoldBag,
    };
});
