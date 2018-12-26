class Grid {
  constructor(points) {
    this.points = points;
    const size = Grid._getMapSize({ points });
    this.minX = size.minX;
    this.minY = size.minY;
    this.maxX = size.maxX;
    this.maxY = size.maxY;
  }

  static _getMapSize({ points }) {
    let maxX = 0;
    let maxY = 0;
    points.forEach(point => {
      maxX = Math.max(point.x, maxX);
      maxY = Math.max(point.y, maxY);
    });

    let minX = maxX;
    let minY = maxY;
    points.forEach(point => {
      minX = Math.min(point.x, minX);
      minY = Math.min(point.y, minY);
    });

    return {
      minX,
      minY,
      maxX,
      maxY,
    };
  };
}

module.exports = Grid;

