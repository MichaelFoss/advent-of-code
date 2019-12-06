const Directions = require('./13.Directions.js');

class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  /**
   * Creates a copy of the Point.
   * @returns {Point} The copy of the Point.
   */
  clone() {
    return new Point({
      x: this.x,
      y: this.y,
    });
  }

  /**
   * Given a direction, sets a new position
   * based on where it is pointing.
   * @param {Directions} direction - The direction.
   */
  step(direction) {
    switch (direction) {
      case Directions.NORTH:
        this.y--;
        break;
      case Directions.SOUTH:
        this.y++;
        break;
      case Directions.EAST:
        this.x++;
        break;
      case Directions.WEST:
        this.x--;
        break;
    }
  }

  /**
   * Determines if a point is at the same position.
   * @param {Point} point - The point to compare position with.
   * @returns {boolean} Whether or not the two points are at the same position.
   */
  isEqual(point) {
    return (
      point.x === this.x &&
      point.y === this.y
    );
  }
}

module.exports = Point;

