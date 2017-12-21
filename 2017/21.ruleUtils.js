const transform = require('./21.transformations.js');
const io = require('./21.io.js');

function translateRule(rule, translation) {
  let originalGrid = io.ruleToGrid(rule[0]);
  let transformedGrid = io.ruleToGrid(rule[1]);
  
  // Turns out I misread the instructions; regardless of which transformation
  // was done on the original pattern, there is no corresponding transformation set
  // done on the new pattern - they're all the same!
  while (translation.length > 0) {
    switch (translation[0]) {
      case 'R':
        originalGrid = transform.rotateLeft(originalGrid);
        // transformedGrid = transform.rotateLeft(transformedGrid);
        break;
      case 'F':
        originalGrid = transform.flipHorizontal(originalGrid);
        // transformedGrid = transform.flipHorizontal(transformedGrid);
        break;
    }
    translation = translation.substr(1);
  }
  return [
    io.gridToRule(originalGrid),
    io.gridToRule(transformedGrid)
  ];
}

function findRule(originalRule, rules, translateFoundRule) {
  // Check initial state
  let rule = originalRule;
  let grid = io.ruleToGrid(rule);
  let ruleIndex = rules.findIndex(r => r[0] === rule);
  translation = '';
  if (ruleIndex !== -1) {
    return translateFoundRule ? translateRule(rules[ruleIndex], translation) : rules[ruleIndex];
  }

  for (let flipCount = 0; flipCount < 2; flipCount++) {
    // Check 3 rotates
    for (let i = 0; i < 3; i++) {
      grid = transform.rotateLeft(grid);
      translation += 'R';
      rule = io.gridToRule(grid, false);
      ruleIndex = rules.findIndex(r => r[0] === rule);
      if (ruleIndex !== -1) {
        return translateFoundRule ? translateRule(rules[ruleIndex], translation) : rules[ruleIndex];
      }
    }

    // If we haven't flip, flip
    if (flipCount === 0) {
      grid = transform.flipHorizontal(grid);
      translation += 'F';
    }
    // If we have flipped, rotate one more time
    else {
      grid = transform.rotateLeft(grid);
      translation += 'R';
    }

    // Test final state
    rule = io.gridToRule(grid, false);
    ruleIndex = rules.findIndex(r => r[0] === rule);
    if (ruleIndex !== -1) {
      return translateFoundRule ? translateRule(rules[ruleIndex], translation) : rules[ruleIndex];
    }
  }
  return undefined;
}

function runRule(grid, rules) {
  const rule = findRule(io.gridToRule(grid), rules, true);
  if (rule === undefined) {
    console.error(`⚠️ ERROR: Cannot find rule for grid:`);
    console.log(io.gridToString(grid));
    process.exit(1);
  }
  const newGrid = io.ruleToGrid(rule[1]);
  return newGrid;
}

module.exports = { findRule, runRule };

