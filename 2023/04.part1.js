import main from '../utils/main.js';

/**
 * Given a string of numbers "XX YY ZZ,"
 * returns the numbers as an array of integers.
 * @param {string} s
 * @returns {number[]}
 */
const parseNumbers = s => s.split(' ').filter(x => x.length > 0).map(x => Number.parseInt(x)).sort();

const getCards = input => {
    const cardLines = input.split('\n');
    const cards = cardLines.map(cardLine => {
        const card = {};
        const [ cardIdString, cardDataString ] = cardLine.slice('Card '.length).split(':');
        const [ winningNumbersString, cardNumbersString ] = cardDataString.split('|');
        return {
            id: Number.parseInt(cardIdString),
            winningNumbers: parseNumbers(winningNumbersString),
            numbers: parseNumbers(cardNumbersString),
        }
    });
    return cards;
};

const getScore = card => {
    let matches = 0;
    const { numbers, winningNumbers } = card;
    for (const number of numbers) {
        let hasWon = false;
        for (let winningNumberIndex = 0; winningNumberIndex < winningNumbers.length && !hasWon; winningNumberIndex++) {
            hasWon = winningNumbers[winningNumberIndex] === number;
        }
        if (hasWon) {
            matches++;
        }
    }
    if (matches === 0) {
        return 0;
    }
    return Math.pow(2, matches - 1);
};

const sumCards = cards => {
    const sum = cards.map(getScore).reduce((a, b) => a + b);
    return sum;
};

main(input => {
    const cards = getCards(input);
    const score = sumCards(cards);
    return score;
});
