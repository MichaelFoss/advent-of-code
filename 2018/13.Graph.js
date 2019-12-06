const Directions = require('./13.Directions.js');
const Point = require('./13.Point.js');
const Path = require('./13.Path.js');
const Node = require('./13.Node.js');

class Graph {
  constructor(data) {
    const parseResults = Graph._parseData(data);
    this._nodes = parseResults.nodes;
    this._carts = parseResults.carts;
    this._crashes = [];
  }

  /**
   * Getter for crashes.
   * @returns {Point[]} The crashes.
   */
  get crashes() { return this._crashes; }

  /**
   * Given a node and direction, assigns a path to that node;
   * if a path exists, does nothing.
   * @param {Node[]} nodes - All nodes to be added to the graph (paths not necessarily defined yet).
   * @param {Node} node - The node to discover a path for (also in nodes).
   * @param {Directions} direction - The direction of the path.
   * @param {string[]} map - The data of the map.
   */
  static _assignPath(nodes, node, direction, map) {
    if (!!node.paths[direction]) {
      return;
    }
    let currentDirection = direction;
    let path = new Path({
      position: node.position.clone(),
    });
    do {
      // Advance to the new position
      path.position.step(currentDirection);
      path.distance++;

      // Figure out what to do with the new position
      switch (map[path.position.y][path.position.x]) {
        case '|':
        case '-':
          // Keep moving
          break;

        case '/':
          // Turn left or right
          switch (currentDirection) {
            case Directions.NORTH:
              currentDirection = Directions.EAST;
              break;
            case Directions.SOUTH:
              currentDirection = Directions.WEST;
              break;
            case Directions.EAST:
              currentDirection = Directions.NORTH;
              break;
            case Directions.WEST:
              currentDirection = Directions.SOUTH;
              break;
          }

        case '\\':
          // Turn left or right
          switch (currentDirection) {
            case Directions.NORTH:
              currentDirection = Directions.WEST;
              break;
            case Directions.SOUTH:
              currentDirection = Directions.EAST;
              break;
            case Directions.EAST:
              currentDirection = Directions.SOUTH;
              break;
            case Directions.WEST:
              currentDirection = Directions.NORTH;
              break;
          }

        case '+':
          // Node found, finish path
          path.targetID = nodes.findIndex(n => n.position.isEqual(node.position))
          break;
      }
    } while (path.targetID === -1);

    node.paths[direction] = path;
  }

  /**
   * Parses the map of the tracks/carts and returns carts & nodes.
   * @returns {{ carts: Points[], nodes: Node[] }} The carts & nodes in the graph.
   */
  static _parseData(data) {
    const isCart = cell => {
      return (
        cell === '^' ||
        cell === 'v' ||
        cell === '<' ||
        cell === '>'
      );
    }

    const map = data.split('\n');

    // Create initial cart & node sets
    const nodes = [];
    const carts = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (isCart(map[y][x])) {
          carts.push(new Point({ x, y }));
        }
        else if (map[y][x] === '+') {
          nodes.push(new Node(new Point({ x, y })));
        }
      }
    }

    // Discover the paths for each node
    nodes.forEach(node => {
      Object.values(Directions).forEach(direction => {
        Graph._assignPath(nodes, node, direction, map);
      });
    });

    // @TODO Set the cart origins

    return {
      carts,
      nodes,
    };
  }

  step() {
    console.log('Adding test crash at [-1, -1]');
    this._crashes.push([-1, -1]);
  }
}

module.exports = Graph;

