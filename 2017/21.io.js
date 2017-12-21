function ruleToGrid(line) {
  return (
    line
      .split('/')
      .map(x => x
        .split('')
        .map(x => x === '#' ? 1 : 0)
      )
  );
}

function gridToString(grid, useSymbols = true) {
  str = grid
    .map(row => row.join(''))
    .join('\n');
  if (useSymbols) {
    str = str
      .replace(/1/g, '#')
      .replace(/0/g, '.')
      .replace(/\//g, '\n');
  }
  return str;
}

function ruleToString(rule, useSymbols = true) {
  let str = rule.replace(/\//g, '\n');
  if (!useSymbols) {
    str = str
      .replace(/#/g, '1')
      .replace(/./g, '0')
  }
  return str;
}

function gridToRule(grid) {
  return gridToString(grid).replace(/\n/g, '/');
}

module.exports = { ruleToGrid, gridToString, ruleToString, gridToRule };

