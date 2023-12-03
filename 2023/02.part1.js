import main from '../utils/main.js';

/**
 * Given a string of pulls, returns all pulls
 * @param {string} gameData
 * @returns {{ blue: number, red: number, green: number }}
 */
const gameDataToPulls = gameData => {
    const pullData = gameData.split('; ');
    const pulls = pullData.map(pullDatum => {
        const pull = {
            blue: 0,
            red: 0,
            green: 0,
        }
        const colorData = pullDatum.split(', ');
        for (const colorDatum of colorData) {
            const [count, color] = colorDatum.split(' ');
            pull[color] = Number.parseInt(count);
        }
        return pull;
    });
    return pulls;
}

const lineToGame = line => {
    const [, gameIdString, gameData] = line.match(/Game ([0-9]+): (.*)/);
    const pulls = gameDataToPulls(gameData);
    return {
        gameId: Number.parseInt(gameIdString),
        pulls,
    };
};

/**
 * @param {{ gameId: number, pulls: { blue: number, red: number, green: number }} game
 * @param {{ blue: number, red: number, green: number }} maxCubesSet
 * @returns {boolean}
 */
const isValidGame = (game, maxCubesSet) => {
    for (const color in maxCubesSet) {
        for (const pull of game.pulls) {
            if (pull[color] > maxCubesSet[color]) {
                return false;
            }
        }
    }
    return true;
};

main(input => {
    const lines = input.split('\n');
    const games = lines.map(lineToGame);
    const maxCubesSet = {
        red: 12,
        green: 13,
        blue: 14,
    };
    const validGames = games.filter(game => isValidGame(game, maxCubesSet));
    const validGameIds = validGames.map(game => game.gameId);
    const sumOfGameIds = validGameIds.reduce((a, b) => a + b);
    return sumOfGameIds;
});
