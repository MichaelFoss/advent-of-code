const { Piece } = require('./24.piece.js');

function runTests() {
  console.log('[•] Piece');
  let piece = new Piece(1, 2);
  console.log(piece);
  console.log(`${piece}`);

  console.log('[•] Pieces');
  let pieces = [
    new Piece(1, 2),
    new Piece(2, 2),
    new Piece(2, 3),
    new Piece(3, 4)
  ];
  console.log(pieces.map(x => `${x}`).join('; '));

  console.log('[•] Root');
  const root = Piece.getRoot();
  console.log(`${root} isRoot: ${root.isRoot()}`)
  console.log(`${piece} isRoot: ${piece.isRoot()}`)

  console.log('[•] Exclude From');
  console.log(piece.excludeFrom(pieces).map(x => `${x}`).join('; '));

  console.log('[•] Matches');
  console.log(piece.getMatches(pieces).map(x => `${x}`).join('; '));

  console.log('[•] Scores');
  console.log([root, ...pieces].map(x => `${x} = ${x.getScore()}`).join('\n'));

  console.log('[•] Max path');
  console.log(root.getMaxPath(pieces));
}

module.exports = { runTests };
