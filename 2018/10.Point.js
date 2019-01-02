class Point {
  static getMin(data, prop, dimension) {
    return data.reduce((min, p) => p[prop][dimension] < min ? p[prop][dimension] : min, data[0][prop][dimension]);
  }

  static getMax(data, prop, dimension) {
    return data.reduce((max, p) => p[prop][dimension] > max ? p[prop][dimension] : max, data[0][prop][dimension]);
  }

  static _getNumbers(line) {
    return line
      .substring(line.indexOf('<') + 1, line.indexOf('>'))
      .trim()
      .split(',')
      .map(x => parseInt(x.trim()))
      .reduce((obj, val, index) => {
        if (index === 0) {
          return { x: val };
        }
        else {
          return { ...obj, y: val };
        }
      }, {})
    ;
  }

  static _sortBy(data, prop) {
    return data.sort((a, b) => {
      if (a[prop].x < b[prop].x) {
        return -1;
      }
      else if (a[prop].x > b[prop].x) {
        return 1;
      }
      else {
        if (a[prop].y < b[prop].y) {
          return -1;
        }
        else if (a[prop].y > b[prop].y) {
          return 1;
        }
        else {
          return 0;
        }
      }
    });
  }

  static sortByPositions(data) {
    return Point._sortBy(data, 'position');
  }

  static sortByVelocities(data) {
    return Point._sortBy(data, 'velocity');
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  static showPoints(points) {
    const offsetX = Point.getMin(points, 'position', 'x');
    const offsetY = Point.getMin(points, 'position', 'y');
    const newPoints = Point.sortByPositions(points.map(point => {
      const p = new Point(point);
      p.position.x -= offsetX;
      p.position.y -= offsetY;
      return p;
    }));
    const maxX = Point.getMax(newPoints, 'position', 'x');
    const maxY = Point.getMax(newPoints, 'position', 'y');
    let lines = [];
    for (let y = 0; y <= maxY; y++) {
      let s = '';
      for (let x = 0; x <= maxX; x++) {
        if (!newPoints.find(point => point.position.x === x && point.position.y === y)) {
          s += '.';
        }
        else {
          s += '#';
        }
      }
      lines.push(s);
    }
    return lines;
  }

  constructor(lineOrPoint) {
    if (lineOrPoint === undefined) {
      this.position = {
        x: null,
        y: null,
      };
      this.velocity = {
        x: null,
        y: null,
      };
    }
    else if (lineOrPoint instanceof Point) {
      const point = lineOrPoint;
      this.position = {
        x: point.position.x,
        y: point.position.y,
      };
      this.velocity = {
        x: point.velocity.x,
        y: point.velocity.y,
      };
    }
    else {
      const line = lineOrPoint;
      // e.g. "position=< 9,  1> velocity=< 0,  2>"
      this.position = Point._getNumbers(line);
      const lineAfterPosition = line.substring(line.indexOf('>') + 2);
      this.velocity = Point._getNumbers(lineAfterPosition);
    }
  }
}

module.exports = Point;

