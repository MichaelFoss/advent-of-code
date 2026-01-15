import main from '../utils/main.js';

const DEBUG_MODE = false;

function parseInput(input) {
  const manifold = (input + '\n').split(/\n\.+\n/).filter(x => x.length > 0);
  if (DEBUG_MODE) {
    console.log('[PARSED INPUT]');
    console.log(manifold);
  }
  return manifold;
}

function connectTachyons(manifold) {
  manifold[0] = manifold[0].replace('S', '|');
  for (
    let lineIndex = 1, splitsThisPass = 0;
    lineIndex < manifold.length;
    lineIndex++, splitsThisPass = 0
  ) {
    const priorLine = manifold[lineIndex - 1];
    // First pass: bring down all lines that haven't split
    for (let column = 0; column < priorLine.length; column++) {
      if (priorLine[column] === '|') {
        if (manifold[lineIndex][column] === '.') {
          manifold[lineIndex] =
            manifold[lineIndex].substring(0, column) +
            '|' +
            manifold[lineIndex].substring(column + 1);
        }
      }
    }
    // Second pass: split all necessary lines
    for (let column = 0; column < priorLine.length; column++) {
      if (priorLine[column] === '|') {
        if (manifold[lineIndex][column] === '|') {
          // Do nothing: we caught this in the first pass
        } else if (manifold[lineIndex][column] === '^') {
          splitsThisPass++;
          if (manifold[lineIndex][column - 1] === '.') {
            manifold[lineIndex] =
              manifold[lineIndex].substring(0, column - 1) +
              '|' +
              manifold[lineIndex].substring(column);
          }
          if (manifold[lineIndex][column + 1] === '.') {
            manifold[lineIndex] =
              manifold[lineIndex].substring(0, column + 1) +
              '|' +
              manifold[lineIndex].substring(column + 2);
          }
        }
      }
    }
  }
  if (DEBUG_MODE) {
    console.log(manifold.join('\n'));
  }
  return manifold;
}

/**
 * Builds out a tree in nodesMap,
 * according to the design in manifoldWithTachyons,
 * at coordinates rowIndex, columnIndex.
 * @param {string[]} manifoldWithTachyons The manifold
 * @param {Map<Map<number>>} nodesMap The tree count, represented as a map of maps, indexed by row then column
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @returns {number} The path count for the current row/column
 */
function buildTree(manifoldWithTachyons, nodesMap, rowIndex, columnIndex) {
  // If we've already built the tree for this path, just use that number;
  // no need to further build anything else out
  if (nodesMap.has(rowIndex) && nodesMap.get(rowIndex).has(columnIndex)) {
    return nodesMap.get(rowIndex).get(columnIndex);
  }
  // The bottom row is a special case; we should determine what
  // the final counts are and not build the tree out further down,
  // as we're at the end of the manifold
  const isBottomRow = rowIndex === manifoldWithTachyons.length - 1;
  if (isBottomRow) {
    let pathCount;
    if (manifoldWithTachyons[rowIndex][columnIndex] === '^') {
      pathCount = 2;
    } else if (manifoldWithTachyons[rowIndex][columnIndex] === '|') {
      pathCount = 1;
    } else {
      // I mean, this should never happen...
      pathCount = 0;
      throw new Error(
        `paths = 0 for rowIndex=${rowIndex}, columnIndex=${columnIndex}`,
      );
    }
    if (!nodesMap.has(rowIndex)) {
      nodesMap.set(rowIndex, new Map());
    }
    nodesMap.get(rowIndex).set(columnIndex, pathCount);
    return pathCount;
  } else {
    // If it's a vertical bar, we don't need to add a node -
    // instead, just follow the path down and see what the resultant
    // path count gives us from child nodes
    if (manifoldWithTachyons[rowIndex][columnIndex] === '|') {
      return buildTree(
        manifoldWithTachyons,
        nodesMap,
        rowIndex + 1,
        columnIndex,
      );
    }
    // If we DON'T have a splitter, something went wrong
    if (manifoldWithTachyons[rowIndex][columnIndex] !== '^') {
      throw new Error(
        `non-splitter and non-tachyon beam for rowIndex=${rowIndex}, columnIndex=${columnIndex}`,
      );
    }
    // Build the tree left and right...
    const leftPathCount = buildTree(
      manifoldWithTachyons,
      nodesMap,
      rowIndex + 1,
      columnIndex - 1,
    );
    const rightPathCount = buildTree(
      manifoldWithTachyons,
      nodesMap,
      rowIndex + 1,
      columnIndex + 1,
    );
    // ...assign the sum to the nodes for reference later...
    const pathCount = leftPathCount + rightPathCount;
    if (!nodesMap.has(rowIndex)) {
      nodesMap.set(rowIndex, new Map());
    }
    nodesMap.get(rowIndex).set(columnIndex, pathCount);
    // ...then return the sum
    return pathCount;
  }
}

function getPathsCount(manifoldWithTachyons) {
  // The start is always the first vertical line on row 1,
  // so look directly beneath that - it will always be a splitter
  const rowIndex = 1;
  const columnIndex = manifoldWithTachyons[0].indexOf('|');
  const nodesMap = new Map();
  const pathsCount = buildTree(
    manifoldWithTachyons,
    nodesMap,
    rowIndex,
    columnIndex,
  );
  return pathsCount;
}

main(input => {
  const manifold = parseInput(input);
  const manifoldWithTachyons = connectTachyons(manifold);
  const pathsCount = getPathsCount(manifoldWithTachyons);
  return pathsCount;
});
