const CellType = {
  EMPTY: ' ',
  VERTICAL: '|',
  HORIZONTAL: '-',
  INTERSECTION: '+',
  ELBOW_BOTTOM_RIGHT: '~|',
  ELBOW_BOTTOM_LEFT: '|~',
  ELBOW_TOP_RIGHT: '|_',
  ELBOW_TOP_LEFT: '_|',

  isCart(cell) {
    return (
      cell === '^' ||
      cell === 'v' ||
      cell === '<' ||
      cell === '>'
    );
  }

  isCurved(cell) {
    return (
      cell === '\\' ||
      cell === '/' ||
      cell === CellType.ELBOW_BOTTOM_RIGHT ||
      cell === CellType.ELBOW_BOTTOM_LEFT ||
      cell === CellType.ELBOW_TOP_RIGHT ||
      cell === CellType.ELBOW_TOP_LEFT
    );
  }

  getTrackType(map, x, y) {
    if (y > 0 && y < map.length && x > 0 && x < map[0].length && )
    switch (map[y][x]) {
      case '^':
        
    }
  }
};

module.exports = CellType;

