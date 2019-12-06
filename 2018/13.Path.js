class Path {
  /**
   * Constructor.
   * @param {number} distance - The distance to the target.
   * @param {Point} position - The coordinates of the target.
   * @param {number} targetID - The ID of the target node.
   */
  constructor({
    distance = 0,
    position = null,
    targetID = -1,
  }) {
    this.position = position;
    this.distance = distance;
    this.targetID = targetID;
  }
}

module.exports = Path;

