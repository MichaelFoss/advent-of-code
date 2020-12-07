const DEBUGGING = true;

const debug = (s, recursiveCall) => DEBUGGING ? console.log(' '.repeat(recursiveCall * 6) + s) : null;

/**
 * A piece.
 */
class Piece {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  /**
   * Determines if another piece matches this piece.
   *
   * @param {Piece} piece
   * @return {boolean}
   */
  isMatch(piece) {
    return (
      this.tail === piece.head ||
      this.tail === piece.tail ||
      this.head === Piece.WILD ||
      this.tail === Piece.WILD ||
      piece.head === Piece.WILD ||
      piece.tail === Piece.WILD
    );
  }

  isTailMatch(piece) {
    return (
      this.tail === piece.head ||
      this.tail === Piece.WILD ||
      piece.head === Piece.WILD ||
      piece.tail === Piece.WILD
    );
  }

  /**
   * Gets the score of the piece;
   * wild numbers are counted as nothing.
   *
   * @return {int}
   */
  getScore() {
    return (
      (this.head !== Piece.WILD ? this.head : 0) +
      (this.tail !== Piece.WILD ? this.tail : 0)
    );
  }

  /**
   * Finds all possible matching pieces.
   *
   * @param {Piece[]} pieces
   * @return {Piece[]}
   */
  getMatches(pieces) {
    const children = [];
    pieces.forEach(piece => {
      if (this.isMatch(piece)) {
        children.push(piece.copy());
      }
    });
    return children;
  }

  getTailMatches(pieces) {
    const matching = pieces
      .filter(piece => {
        if (this.isTailMatch(piece)) {
          return true;
        }
        const flipped = piece.copy();
        flipped.flip();
        return this.isTailMatch(flipped);
      })
      .map(piece => piece.copy());
    return matching;
  }

  /**
   * Flips the piece.
   */
  flip() {
    const tmp = this.head;
    this.head = this.tail;
    this.tail = tmp;
  }

  /**
   * Given an array of pieces,
   * returns a NEW array of NEW pieces.
   * @param {Piece[]} pieces
   * @returns {Piece[]}
   */
  static sort(pieces) {
    const newPieces = [
      ...pieces.map(piece => piece.copy()),
    ];
    newPieces.forEach(piece => {
      if (piece.head > piece.tail) {
        piece.flip();
      }
    });
    newPieces.sort((a, b) => {
      const minA = Math.min(a.head, a.tail);
      const minB = Math.min(b.head, b.tail);
      if (minA === minB) {
        const maxA = Math.max(a.head, a.tail);
        const maxB = Math.max(b.head, b.tail);
        return maxA - maxB;
      }
      else {
        return minA - minB;
      }
    });
    return newPieces;
  }

  /**
   * Determines whether or not a piece is a root.
   *
   * @returns {boolean}
   */
  isRoot() {
    return this.head === null || this.tail === null;
  }

  /**
   * Determines if two pieces are equal;
   * flips pieces around so that it faces either way.
   *
   * @param {Piece} piece
   * @return {boolean}
   */
  equals(piece) {
    return (
        this.head === piece.head && this.tail === piece.tail ||
        this.head === piece.tail && this.tail === piece.head
    );
  }

  /**
   * Creates a copy of the pieces parameter,
   * without the current piece (including the flipped version)
   * existing in it.
   *
   * @param {Piece[]} pieces
   * @return {Piece[]}
   */
  excludeFrom(pieces) {
    return pieces
        .filter(piece => !this.equals(piece))
        .map(piece => piece.copy());
  }

  /**
   * Creates a root wild Piece.
   *
   * @return {Piece}
   */
  static getRoot() {
    return new Piece(null, 0);
  }

  /**
   * Creates a new Piece.
   *
   * @param {Piece} piece
   * @return {Piece}
   */
  static clone(piece) {
    return new Piece(piece.head, piece.tail);
  }

  /**
   * Creates a copy of the existing Piece.
   *
   * @return {Piece}
   */
  copy() {
    return Piece.clone(this);
  }

  /**
   * Gets a max path from the current piece
   * based on a set of available pieces.
   *
   * @param {Piece[]} pieces
   * @param {number} [recursiveCall]
   * @return {Piece[]}
   */
  getMaxPath(pieces, recursiveCall = 0) {
    const remainingPieces = this.excludeFrom(pieces);
    const matchingPieces = this.getMatches(remainingPieces);
    if (matchingPieces.length === 0) {
      return [];
    }

    debug(`• MAX PATH --> ${this}`, recursiveCall);
    debug(`•          --> ${Piece.listToString(matchingPieces)}`, recursiveCall);
    debug(`•          --> ${Piece.listToString(remainingPieces)}`, recursiveCall);

    const paths = [];

    // For every MATCHING piece...
    matchingPieces.forEach(matchingPiece => {
      // ...find the longest path based on all REMAINING pieces
      console.log(`GMP1: ${this}, ${matchingPiece}`);
      if (!this.isTailMatch(matchingPiece)) {
        matchingPiece.flip();
      }
      console.log(`GMP2: ${this}, ${matchingPiece}`);
      const matchingPieceMaxPath = matchingPiece.getMaxPath(remainingPieces, recursiveCall + 1);
      paths.push([matchingPiece, ...matchingPieceMaxPath]);
    });

    debug(`• All Possible Paths for ${this} (${paths.length}):\n${' '.repeat(recursiveCall * 6 + 4)}${paths.map(path => `[${Piece.listToString(path)}] (${path.reduce((sum, piece) => sum + piece.getScore(), 0)})`).join(`\n${' '.repeat(recursiveCall * 6 + 4)}`)}`, recursiveCall);

    // Reduce tree
    let maxPathScore = 0;
    //debug(`• Reducing paths:`, recursiveCall);
    const maxPath = paths.reduce((maxPath, currentPath) => {
      //debug(`  ° Max Path: [${maxPath.map(piece => piece.toString()).join(', ')}], Current Path: [${currentPath.map(piece => piece.toString()).join(', ')}]`, recursiveCall);
      let currentPathScore = currentPath.reduce((sum, piece) => sum + piece.getScore(), 0);
      if (currentPathScore > maxPathScore) {
        maxPathScore = currentPathScore;
        return currentPath;
      }
      else {
        return maxPath;
      }
    }, []);

    debug(`• Max Path for ${this} (${maxPathScore}): [${Piece.listToString(maxPath)}]`, recursiveCall);
    return maxPath;
  }

  /**
   * Returns a string representation of the object.
   *
   * @returns {string}
   */
  toString() {
    return `${this.head}/${this.tail}`;
  }

  static listToString(list) {
    return list.map(piece => piece.toString()).join('--');
  }

  /**
   * A number to assign to a piece to mark it as matching anything.
   */
  static WILD = -1;
}

module.exports = { Piece };
