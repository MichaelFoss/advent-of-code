import main from '../utils/main.js';

const NUMBER_NAME_MAP = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];
const DIGIT_OR_STRING_REGEX_PATTERN = `([0-9]{1}|${NUMBER_NAME_MAP.join('|')})`;

const convertToDigit = (str) => {
    if (NUMBER_NAME_MAP.includes(str)) {
        return NUMBER_NAME_MAP.indexOf(str);
    }
    else {
        return Number.parseInt(str);
    }
};

const lineToNumber = line => {
    const firstMatch = new RegExp(`${DIGIT_OR_STRING_REGEX_PATTERN}.*`).exec(line)[1];
    const lastMatch = new RegExp(`.*${DIGIT_OR_STRING_REGEX_PATTERN}.*`).exec(line)[1];
    const firstDigit = convertToDigit(firstMatch);
    const lastDigit = convertToDigit(lastMatch);
    return firstDigit * 10 + lastDigit;
};

main(input => {
    const lines = input.split('\n');
    const values = lines.map(lineToNumber);
    const sum = values.reduce((a, b) => a + b);
    return sum;
});
