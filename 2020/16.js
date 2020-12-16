const main = require('../utils/main.js');

const DEBUG_LEVEL = 0; // [ 0, 1, 2, 3 ]

const log = (logLevel, ...args) => DEBUG_LEVEL && logLevel >= DEBUG_LEVEL && console.log(...args);
const log1 = (...args) => log(1, ...args); // 1, 2, 3
const log2 = (...args) => log(2, ...args); // 2, 3
const log3 = (...args) => log(3, ...args); // 3

const parseInput = input => {
    const parts = input.split('\n\n');

    const fields = parts[0]
        .split('\n')
        .map(x => ({
            name: x.substring(0, x.indexOf(': ')),
            nums: x
                .substring(x.indexOf(': ') + 2)
                .split(' or ')
                .map(y => {
                    const nums = y.split('-');
                    return {
                        min: Number(nums[0]),
                        max: Number(nums[1]),
                    };
                }),
            })
        );

    const yourTicket = parts[1]
        .split('\n')[1]
        .split(',')
        .map(x => Number(x));

    const nearbyTickets = parts[2]
        .split('\n')
        .map(x => x
            .split(',')
            .map(y => Number(y))
        );
    nearbyTickets
        .shift();

    return {
        fields,
        yourTicket,
        nearbyTickets,
    };
}

const isTicketNumberValid = (ticketNum, fields) => {
    for (let i = 0; i < fields.length; i++) {
        let isValid = false;
        for (let j = 0; j < fields[i].nums.length && !isValid; j++) {
            const { min, max } = fields[i].nums[j];
            isValid = ticketNum >= min && ticketNum <= max;
        }
        if (isValid) {
            return true;
        }
    }
    return false;
};

const getInvalidTicketNum = (ticket, fields) => {
    for (let i = 0; i < ticket.length; i++) {
        if (!isTicketNumberValid(ticket[i], fields)) {
            return ticket[i];
        }
    }
    return null;
};

const runPart1 = ({ fields, nearbyTickets, }) => {
    let sum = 0;
    nearbyTickets.forEach(ticket => {
        sum += getInvalidTicketNum(ticket, fields) || 0;
    });
    return sum;
};

const flipObject = (obj, useNumericalValues = false) => Object.keys(obj)
    .reduce((newObj, key) => ({
        ...newObj,
        [obj[key]]: useNumericalValues ? Number(key) : key,
    }), {});

const runPart2 = ({ fields, yourTicket, nearbyTickets, }, wordToMatch) => {
    for (let i = 0; i < nearbyTickets.length; i++) {
        if (getInvalidTicketNum(nearbyTickets[i], fields) !== null) {
            nearbyTickets.splice(i, 1);
            i--;
        }
    }
    const possibleTicketNumberPositionsMapping = {};
    log1('Fields');
    log1('  ' + fields.map(x => `${x.name}: ${x.nums.map(x => `${x.min}-${x.max}`).join(', ')}`).join('\n  '));
    log1();
    log1('Nearby Tickets');
    log1('  ' + nearbyTickets.map(x => x.join(', ')).join('\n  '));
    log1();
    log1('-----------------------------------------------');
    log1();
    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        const fieldSet = fields[fieldIndex];
        log1(`Field Set (${fieldIndex}):`);
        log1(`${fieldSet.name}: ${fieldSet.nums.map(x => `${x.min}-${x.max}`).join(', ')}`);
        log1();
        for (let nearbyTicketNumberIndex = 0; nearbyTicketNumberIndex < nearbyTickets[0].length; nearbyTicketNumberIndex++) {
            let allNearbyTicketNumbersValid = true;
            for (let nearbyTicketIndex = 0; allNearbyTicketNumbersValid && nearbyTicketIndex < nearbyTickets.length; nearbyTicketIndex++) {
                const nearbyTicket = nearbyTickets[nearbyTicketIndex];
                log1(`  Nearby Ticket (${nearbyTicketIndex}):`)
                log1(`  ${nearbyTicket}\n`);
                const nearbyTicketNumber = nearbyTicket[nearbyTicketNumberIndex];
                log1(`    Nearby Ticket Number (${nearbyTicketNumberIndex}):`)
                log1(`    ${nearbyTicketNumber}`);
                log1(`    ${isTicketNumberValid(nearbyTicketNumber, [ fieldSet ])}\n`);
                if (!isTicketNumberValid(nearbyTicketNumber, [ fieldSet ])) {
                    allNearbyTicketNumbersValid = false;
                }
            }
            if (allNearbyTicketNumbersValid) {
                log1(`  All Nearby Ticket Numbers Valid, setting possible ticket number position mapping of ${nearbyTicketNumberIndex} to ${fieldIndex}\n`);
                if (possibleTicketNumberPositionsMapping[nearbyTicketNumberIndex] === undefined) {
                    possibleTicketNumberPositionsMapping[nearbyTicketNumberIndex] = [];
                }
                possibleTicketNumberPositionsMapping[nearbyTicketNumberIndex].push(fieldIndex);
            }
            log1();
        }
    }
    log2(`\n\n--------------------------------`);
    log2(`  ALL POSSIBLE POSITIONS FOUND`);
    log2(`--------------------------------\n\n`);
    const ticketNumberPositionMapping = {};
    for (let possibleTicketNumberPositionsMappingKeys = Object.keys(possibleTicketNumberPositionsMapping); possibleTicketNumberPositionsMappingKeys.length > 0; ) {
        log2('Possible Positions:');
        log2(possibleTicketNumberPositionsMapping);
            let nextIndex = undefined;
        for (let i = 0; nextIndex === undefined && i < possibleTicketNumberPositionsMappingKeys.length; i++) {
            const key = possibleTicketNumberPositionsMappingKeys[i];
            if (possibleTicketNumberPositionsMapping[key].length === 1) {
                nextIndex = key;
            }
        }
        const value = possibleTicketNumberPositionsMapping[nextIndex][0];
        log2(`Discovered position ${nextIndex} to only be ${value}, removing from remaining ${possibleTicketNumberPositionsMappingKeys.length - 1} possibilities...`);
        ticketNumberPositionMapping[nextIndex] = value;
        delete possibleTicketNumberPositionsMapping[nextIndex];
        possibleTicketNumberPositionsMappingKeys = Object.keys(possibleTicketNumberPositionsMapping)
        possibleTicketNumberPositionsMappingKeys
            .forEach(possibleTicketNumberPositionsMappingKey => {
                possibleTicketNumberPositionsMapping[possibleTicketNumberPositionsMappingKey] =
                    possibleTicketNumberPositionsMapping[possibleTicketNumberPositionsMappingKey].filter(num => num !== value)
            });
    }
    log2();
    log2('---------------------------');
    log2();
    log3('Your Ticket:');
    log3();
    log3(yourTicket
        .map((val, index) => `${index < 10 ? ' ' : ''}${index}: ${val}`)
        .join('\n')
    );
    log3();
    log3('Fields:');
    log3(fields.map((field, fieldIndex) => `${fieldIndex}: ${field.name}`));
    const ticketNumberPositionMappingIndices = Object.keys(ticketNumberPositionMapping);
    const ticketNumberIndexToFieldMapping = {};
    ticketNumberPositionMappingIndices.forEach(ticketNumberPositionMappingIndex => {
        const fieldIndex = ticketNumberPositionMapping[ticketNumberPositionMappingIndex];
        ticketNumberIndexToFieldMapping[ticketNumberPositionMappingIndex] = fields[fieldIndex];
    });
    log3();
    log3('Mappings of ticket number indices to fields/indices:');
    log3();
    log3(ticketNumberIndexToFieldMapping);
    const matchingFieldIndices = [];
    for (let i = 0; i < Object.keys(ticketNumberIndexToFieldMapping).length; i++) {
        if (ticketNumberIndexToFieldMapping[i].name.startsWith(wordToMatch)) {
            matchingFieldIndices.push(i);
        }
    }
    log3();
    log3('Matching field indices:');
    log3();
    log3(matchingFieldIndices);
    log3();
    log3('Matching fields:');
    log3();
    log3(matchingFieldIndices
        .map(x => ticketNumberIndexToFieldMapping[x])
    );
    const yourMatchingTicketNumbers = yourTicket
        .filter((num, numIndex) => matchingFieldIndices.includes(numIndex));
    log3();
    log3('Your ticket numbers with matching fields:');
    log3();
    log3(yourMatchingTicketNumbers);
    return yourMatchingTicketNumbers
        .reduce((product, curr) => product * curr, 1);
};

main(input => {
    const data = parseInput(input);
    const firstFieldNameFirstWord = data
        .fields[0]
        .name
        .split(' ')[0];
    return {
        part1: runPart1(data),
        part2: runPart2(data, firstFieldNameFirstWord),
    };
});
