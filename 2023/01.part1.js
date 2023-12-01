import main from '../utils/main.js';

const lineToNumber = line => {
    const firstDigit = Number.parseInt(line.match(/([\d])/)[0]);
    const lastDigit = Number.parseInt(line.match(/.*([\d])/)[1]);
    return firstDigit * 10 + lastDigit;
};

main(input => {
    const lines = input.split('\n');
    const values = lines.map(lineToNumber);
    const sum = values.reduce((a, b) => a + b);
    return sum;
});
