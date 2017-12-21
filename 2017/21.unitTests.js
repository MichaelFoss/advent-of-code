const transform = require('./21.transformations.js');
const io = require('./21.io.js');
const gridUtils = require('./21.gridUtils.js');

function run(rule) {
  console.log('Rule');
  let tmp = rule[0];
  console.log(tmp);

  console.log('Grid');
  tmp = io.ruleToGrid(tmp);
  console.log(tmp);

  console.log('Rule as numerical string');
  console.log(io.gridToString(tmp, false));

  console.log('Rule as string');
  console.log(io.gridToString(tmp));

  console.log('Horizontally flipped grid');
  console.log(io.gridToString(transform.flipHorizontal(tmp)));

  console.log('Vertically flipped grid');
  console.log(io.gridToString(transform.flipVertical(tmp)));

  console.log('Grid rotated 90° right');
  console.log(io.gridToString(transform.rotateRight(tmp)));

  console.log('Grid rotated 180° right');
  console.log(io.gridToString(transform.rotateRight(transform.rotateRight(tmp))));

  console.log('Grid rotated 270° right');
  console.log(io.gridToString(transform.rotateRight(transform.rotateRight(transform.rotateRight(tmp)))));

  console.log('Grid rotated 90° left');
  console.log(io.gridToString(transform.rotateLeft(tmp)));

  console.log('Grid rotated 180° left');
  console.log(io.gridToString(transform.rotateLeft(transform.rotateLeft(tmp))));

  console.log('Grid rotated 270° left');
  console.log(io.gridToString(transform.rotateLeft(transform.rotateLeft(transform.rotateLeft(tmp)))));

  console.log('Original rule');
  tmp = io.gridToRule(tmp, false);
  console.log(tmp);


  let grid = io.ruleToGrid(rule[0]);
  console.log(`\nOriginal grid:`);
  console.log(grid);

  console.log(`\nBroken up grid[0]:`);
  grid = gridUtils.getBrokenUpGrid(grid);
  console.log(grid[0]);

  console.log(`\nRecombined grid:`);
  grid = gridUtils.getCombinedGrid(grid);
  console.log(grid);
}

module.exports = { run };
