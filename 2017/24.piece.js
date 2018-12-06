const DEBUGGING = true;

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
      this.tail === Piece.prototype.WILD ||
      piece.head === Piece.prototype.WILD ||
      piece.tail === Piece.prototype.WILD
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
      (this.head !== Piece.prototype.WILD ? this.head : 0) +
      (this.tail !== Piece.prototype.WILD ? this.tail : 0)
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
    pieces.map(piece => {
      if (this.isMatch(piece)) {
        children.push(piece);
      }
    });
    return children;
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
   * Determines whether or not a piece is a root.
   *
   * @returns {boolean}
   */
  isRoot() {
    return this.head === Piece.prototype.WILD && this.tail === Piece.prototype.WILD;
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
      this.head === piece.head && this.tail === piece.tail
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
    const otherPieces = [];
    const flipped = Piece.clone(this);
    flipped.flip();
    pieces.forEach(newPiece => {
      if (!this.equals(newPiece) && !flipped.equals(newPiece)) {
        otherPieces.push(Piece.clone(newPiece));
      }
    });
    return otherPieces;
  }

  /**
   * Creates a root wild Piece.
   *
   * @return {Piece}
   */
  static getRoot() {
    return new Piece(Piece.prototype.WILD, Piece.prototype.WILD);
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
   * Gets a max path from the current piece
   * based on a set of available pieces.
   *
   * @param {Piece[]} pieces
   * @return {Piece[]}
   */
  getMaxPath(pieces) {
    if (pieces.length === 0) {
      return [];
    }

    if (DEBUGGING) {
      console.log(`• Getting max path for piece ${this}: [${pieces.map(piece => piece.toString()).join(', ')}]`);
    }

    const paths = [];

    // Grow tree
    pieces.forEach(piece => {
      // Form each other path
      const otherPieces = piece.excludeFrom(pieces);
      const matchingPieces = piece.getMatches(otherPieces);
      console.log(`• Piece: ${piece}`);
      console.log(`• Pieces: [${pieces.map(piece => piece.toString()).join(', ')}]`);
      console.log(`• Other Pieces: [${otherPieces.map(piece => piece.toString()).join(', ')}]`);
      console.log(`• Matching Pieces: [${matchingPieces.map(piece => piece.toString()).join(', ')}]`);

      // If nothing, then build just the piece
      if (matchingPieces.length === 0) {
        paths.push([piece]);
      }
      // Otherwise, check the remaining pieces
      else {
        // For every piece that can connect...
        matchingPieces.forEach(matchingPiece => {
          // ...find the longest path based on all other pieces
          console.log(`• Building tree for piece ${matchingPiece}: [${matchingPiece.excludeFrom(otherPieces).map(piece => piece.toString()).join(', ')}]`);
          paths.push([piece, ...matchingPiece.getMaxPath(matchingPiece.excludeFrom(otherPieces))]);
        });
      }
    });

    if (DEBUGGING) {
      console.log(`• All Possible Paths for ${this} (${paths.length}):\n  ${paths.map(path => '[' + path.map(piece => piece.toString()).join(', ') + ']').join('\n  ')}`);
    }

    // Reduce tree
    let maxPathScore = 0;
    console.log(`• Reducing paths:`);
    const maxPath = paths.reduce((maxPath, currentPath) => {
      console.log(`  ° Max Path: [${maxPath.map(piece => piece.toString()).join(', ')}], Current Path: [${currentPath.map(piece => piece.toString()).join(', ')}]`);
      let currentPathScore = currentPath.reduce((sum, piece) => sum + piece.getScore(), 0);
      if (currentPathScore > maxPathScore) {
        maxPathScore = currentPathScore;
        return currentPath;
      }
      else {
        return maxPath;
      }
    }, []);

    if (DEBUGGING) {
      console.log(`• Max Path for ${this}: [${maxPath.map(piece => piece.toString()).join(', ')}]`);
    }
  }

  /**
   * Returns a string representation of the object.
   *
   * @returns {string}
   */
  toString() {
    return `<${this.head},${this.tail}>`;
  }
}

/**
 * A number to assign to a piece to mark it as matching anything.
 */
Piece.prototype.WILD = -1;

module.exports = { Piece };
