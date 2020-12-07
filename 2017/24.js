// const FILENAME = './24.test.small.txt';
// const FILENAME = './24.test.txt';
const FILENAME = './24.input.txt';

const { Piece } = require('./24.piece.js');
const { runTests } = require('./24.unitTests.js');

/**
 * Parses the data in a file and returns the equivalent in pieces.
 *
 * @param {string} fileName
 * @return {Piece[]}
 */
function parseData(fileName) {
  const fs = require('fs');
  const lines = fs.readFileSync(fileName, 'utf8').trim().split('\n');
  const pieces = [];
  lines.map(line => {
    const numbers = line.split('/').map(x => Number.parseInt(x));
    pieces.push(new Piece(numbers[0], numbers[1]));
  });
  return Piece.sort(pieces);
}

/**
 * Part 1.
 */
function part1() {
  const pieces = parseData(FILENAME);
  const rootPiece = Piece.getRoot();
  const maxPath = rootPiece.getMaxPath(pieces);
  console.log(maxPath);
}

//runTests();

part1();
