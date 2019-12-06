"use strict";

const fs = require('fs');

const DEBUG = false;
const DEBUG_OPTIMIZATION_CHECKPOINT = 10000;

const INPUT_FILE = '09.input.json';
// const INPUT_FILE = '09.test.json';

let data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8').trim());

const prettify = ({ circle, circleSize, currentMarble, player, game }) => {
  let s = `[${player.toString().padStart(game.players.toString().length, ' ')}] `;
  const marblePadding = game.lastMarble.length + 2;
  for (let i = 0; i < circleSize; i++) {
    if (currentMarble === i) {
      s += `(${circle[i]})`.padStart(marblePadding, ' ');
    }
    else {
      s += ` ${circle[i]} `.padStart(marblePadding, ' ');
    }
  }
  return s;
};

const removeAt = (circle, circleSize, index) => {
  for (let i = index; i < circleSize; i++) {
    circle[i] = circle[i + 1];
  }
  return circleSize - 1;
}

const insertInto = (circle, circleSize, index, marble) => {
  for (let i = circleSize; i >= index; i--) {
    circle[i] = circle[i - 1];
  }
  circle[index] = marble;
  return circleSize + 1;
}

const playGame = game => {
  const circle = new Uint32Array(game.lastMarble);
  circle[0] = 0;
  let circleSize = 1;
  let currentMarble = 0;
  let player = 0;
  const scores = Array.from(new Array(game.players), () => 0);
  for (let marble = 1; marble <= game.lastMarble; marble++) {
    if (marble % DEBUG_OPTIMIZATION_CHECKPOINT === 0) {
      console.log(`Marble ${marble} / ${game.lastMarble}`);
    }
    // Look for rule 23
    if (marble % 23 === 0) {
      let removeMarbleIndex = currentMarble - 7;
      while (removeMarbleIndex < 0) {
        removeMarbleIndex += circleSize;
      }
      let score = marble + circle[removeMarbleIndex];
      circleSize = removeAt(circle, circleSize, removeMarbleIndex);
      currentMarble = removeMarbleIndex;
      // Really, should only ever be ===, but just to be safe
      if (currentMarble >= circleSize) {
        currentMarble = 0;
      }
      if (DEBUG) {
        console.log(`${player}: ${scores[player]} + ${score} = ${scores[player] + score}`);
      }
      scores[player] += score;  
    }
    // Place marble
    else {
      if (circleSize > 2) {
        if (currentMarble + 1 < circleSize - 1) {
          circleSize = insertInto(circle, circleSize, currentMarble + 2, marble);
          currentMarble += 2;
        }
        else if (currentMarble + 1 === circleSize) {
          circleSize = insertInto(circle, circleSize, 1, marble);
          currentMarble = 1;
        }
        else if (currentMarble + 1 === circleSize - 1) {
          circle[circleSize] = marble;
          circleSize++;
          currentMarble = circleSize - 1;
        }
      }
      else if (circleSize === 2) {
        circle[2] = circle[1];
        circle[1] = marble;
        circleSize++;
        currentMarble = 1;
      }
      else if (circleSize === 1) {
        circle[circleSize] = marble;
        circleSize++;
        currentMarble = 1;
      }
    }

    if (DEBUG) {
      console.log(prettify({ circle, circleSize, currentMarble, player: player + 1, game }));
    }

    // Advance to next turn
    player++;
    if (player === game.players) {
      player = 0;
    }
  }

  game.winner = scores.reduce((winner, score, player) => score > scores[winner] ? player : winner, 0);
  game.highScore = scores[game.winner];

  return game;
};

const main = (games) => {
  games.forEach(game => playGame(game));
  return games;
}

console.log(main(data));

