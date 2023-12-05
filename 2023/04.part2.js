import main from '../utils/main.js';

/**
 * Given a string of numbers "XX YY ZZ,"
 * returns the numbers as an array of integers.
 * @param {string} s
 * @returns {number[]}
 */
const parseNumbers = s => s.split(' ').filter(x => x.length > 0).map(x => Number.parseInt(x)).sort();

const getScore = card => {
    const { matches } = card;
    if (matches === 0) {
        return 0;
    }
    return Math.pow(2, matches - 1);
}

const getMatches = card => {
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
    return matches;
};

const getCards = input => {
    const cardLines = input.split('\n');
    const cards = cardLines.map(cardLine => {
        const [ cardIdString, cardDataString ] = cardLine.slice('Card '.length).split(':');
        const [ winningNumbersString, cardNumbersString ] = cardDataString.split('|');
        const [ numbers, winningNumbers ] = [ cardNumbersString, winningNumbersString ].map(parseNumbers);
        const card = {
            id: Number.parseInt(cardIdString),
            winningNumbers,
            numbers,
            count: 1,
        };
        card.matches = getMatches(card);
        card.score = getScore(card);
        return card;
    });
    return cards;
};

const getCardCount = cards => {
    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        for (let additionalCardIndex = cardIndex + 1; additionalCardIndex < cardIndex + 1 + cards[cardIndex].matches; additionalCardIndex++) {
            cards[additionalCardIndex].count += cards[cardIndex].count;
        }
    }
    const sum = cards.map(card => card.count).reduce((a, b) => a + b);
    return sum;
};

main(input => {
    const cards = getCards(input);
    const cardCount = getCardCount(cards);
    return cardCount;
});
