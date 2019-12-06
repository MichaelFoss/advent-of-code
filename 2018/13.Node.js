const Directions = require('./13.Directions.js');

class Node {
  /**
   * Constructor.
   * @param {Point} position - The location of the node.
   */
  constructor(position) {
    this.id = Node._generateID();
    this.position = position;
    this.paths = {
      [Directions.NORTH]: null,
      [Directions.SOUTH]: null,
      [Directions.EAST]: null,
      [Directions.WEST]: null,
    };
  }

  static _generateID() {
    if (!Node._nextID) {
      Node._nextID = 1;
      return 0;
    }
    else {
      Node._nextID++;
      return Node._nextID - 1;
    }
  }
}

module.exports = Node;

