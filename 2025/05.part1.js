import main from '../utils/main.js';

const DEBUG_MODE = false;

function parseInput(input) {
  const ids = [];
  const freshRanges = [];
  const lines = input.split('\n');
  let isID = false;
  for (const line of lines) {
    if (line.length === 0) {
      isID = true;
    } else {
      if (isID) {
        ids.push(Number.parseInt(line));
      } else {
        const [startRange, endRange] = line
          .split('-')
          .map((s) => Number.parseInt(s));
        freshRanges.push([startRange, endRange]);
      }
    }
  }
  return { freshRanges, ids };
}

function isFreshIngredient(id, freshRanges) {
  for (const freshRange of freshRanges) {
    const [startRange, endRange] = freshRange;
    if (id >= startRange && id <= endRange) {
      return true;
    }
  }
  return false;
}

main((input) => {
  const { freshRanges, ids } = parseInput(input);
  let freshIngredients = 0;
  for (const id of ids) {
    if (isFreshIngredient(id, freshRanges)) {
      freshIngredients++;
    }
  }
  return freshIngredients;
});
