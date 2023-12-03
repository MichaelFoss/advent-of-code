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
 * @returns {{ blue: number, red: number, green: number }}
 */
const getMinimumCubesSet = game => {
    const minimumCubesSet = {
        blue: 0,
        red: 0,
        green: 0,
    }
    for (const pull of game.pulls) {
        for (const color in pull) {
            minimumCubesSet[color] = Math.max(pull[color], minimumCubesSet[color]);
        }
    }
    return minimumCubesSet;
};

/**
 * @param {{ blue: number, red: number, green: number }} cubeSet
 * @returns {number}
 */
const getCubeSetPower = cubeSet => {
    let power = 1;
    for (const color in cubeSet) {
        power *= cubeSet[color];
    }
    return power;
}

main(input => {
    const lines = input.split('\n');
    const games = lines.map(lineToGame);
    const minimumCubesSets = games.map(getMinimumCubesSet);
    const cubeSetPowers = minimumCubesSets.map(getCubeSetPower);
    const sumOfPowers = cubeSetPowers.reduce((a, b) => a + b);
    return sumOfPowers;
});
