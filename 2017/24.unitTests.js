const { Piece } = require('./24.piece.js');

const header = title => console.log(`\n[•] ${title}`);

function runTests() {
  header('Piece');
  let piece = new Piece(1, 2);
  console.log(piece);
  console.log(`${piece}`);

  header('Pieces');
  let pieces = [
    new Piece(1, 2),
    new Piece(2, 2),
    new Piece(2, 3),
    new Piece(3, 4)
  ];
  console.log(pieces.map(x => `${x}`).join('; '));

  header('Root');
  const root = Piece.getRoot();
  console.log(`${root} isRoot: ${root.isRoot()}`)
  console.log(`${piece} isRoot: ${piece.isRoot()}`)

  header('Flip');
  const f = new Piece(1, 2);
  console.log(f);
  f.flip();
  console.log(f);

  header('Clone / Copy');
  const original = new Piece(1, 2);
  const copy = original.copy();
  const clone = Piece.clone(original);
  console.log(`${original} original ?== ${copy} copy: ${original === copy}`)
  console.log(`${original} original ?== ${clone} clone: ${original === clone}`)

  header('Sort');
  let unsortedPieces = [
    new Piece(2, 2),
    new Piece(1, 2),
    new Piece(5, 1),
    new Piece(2, 3),
    new Piece(6, 7),
    new Piece(5, 5),
    new Piece(4, 9),
  ];
  console.log(unsortedPieces);
  console.log(Piece.sort(unsortedPieces));

  header('Exclude From');
  // 1/2 from 2/2, 2/3, 3/4
  console.log('3: ' + piece.excludeFrom(pieces).map(x => `${x}`).join('; '));
  console.log('0: ' + piece.excludeFrom([]).map(x => `${x}`).join('; '));

  header('Matches');
  const matchingPiece = new Piece(3, 4);
  const matchingPieces = [
      new Piece(2, 3),
  ];
  console.log(piece.getMatches(pieces).map(x => `${x}`).join('; '));
  console.log(matchingPiece.getMatches(matchingPieces).map(x => `${x}`).join('; '));

  header('Scores');
  console.log([root, ...pieces].map(x => `${x} = ${x.getScore()}`).join('\n'));

  header('Max path');
  console.log(root.getMaxPath(pieces));
}

module.exports = { runTests };
