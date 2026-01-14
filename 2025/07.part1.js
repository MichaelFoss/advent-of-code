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

function getSplitCount(manifold) {
  let splitCount = 0;
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
    splitCount += splitsThisPass;
    if (DEBUG_MODE) {
      console.log(
        `\n${splitCount} (+${splitsThisPass}):\n` + manifold.join('\n'),
      );
    }
  }
  return splitCount;
}

main(input => {
  const manifold = parseInput(input);
  const splitCount = getSplitCount(manifold);
  return splitCount;
});
