const transform = require('./21.transformations.js');
const io = require('./21.io.js');
const unitTests = require('./21.unitTests.js');
const gridUtils = require('./21.gridUtils.js');
const ruleUtils = require('./21.ruleUtils.js');

function run(MAX_ITERATIONS) {
  const INITIAL_GRID = io.ruleToGrid(`.#./..#/###`);
  const RUN_UNIT_TESTS = false;
  //const FILENAME = './21.test.txt';
  const FILENAME = './21.input.txt';
  const input = require('fs').readFileSync(FILENAME, 'utf8').trim()
    .split('\n')
    .map(line => line.split(' => '));

  if (RUN_UNIT_TESTS) {
    unitTests.run(input[1]);
    return;
  }

  const rules = [];

  // Add rules
  input.forEach(rule => {
    const foundRule = ruleUtils.findRule(rule[0], rules, false);
    if (foundRule === undefined) {
      rules.push(rule);
    }
  });

  let grid = INITIAL_GRID;

  /*
  console.log('=== RULES ===');
  console.log(rules.map(rule => {
    const pattern = io.gridToString(io.ruleToGrid(rule[0]));
    const transform = io.gridToString(io.ruleToGrid(rule[1]));
    return pattern + '\n  =>\n' + transform + '\n\n';
  }).join('\n'));
  */
  for (let i = 1; i <= MAX_ITERATIONS; i++) {
    // console.log(`=== ${i} ===`);
    // console.log(io.gridToString(grid));
    // console.log();
    grid = gridUtils.getExpandedGrid(grid, rules);
    console.log(`Iteration ${i}/${MAX_ITERATIONS}`);
  }
  console.log(`=== FINAL STATE ===`);
  console.log(io.gridToString(grid));
  const count =
    grid.reduce((sum, row) =>
      sum + row.reduce((sum, cell) =>
        sum + cell, 0
      ), 0
    );
  console.log(`Total count: ${count}\n`);
}

module.exports = { run };

