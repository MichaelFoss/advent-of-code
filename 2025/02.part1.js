import main from '../utils/main.js';

const DEBUG_MODE = false;

function isInvalidId(n) {
  const s = n.toString();
  if (s.length % 2 === 1) {
    if (DEBUG_MODE) {
      console.log(`👍🏻 ${s} (${s.length} % 2 === 1: ${s.length % 2})`);
    }
    return false;
  }
  const a = s.substring(0, s.length / 2);
  const b = s.substring(s.length / 2);
  if (DEBUG_MODE) {
    console.log(`${a === b ? '❌' : '👍🏻'} ${s} (${a} ?== ${b})`);
  }
  return a === b;
}

function addInvalidIds(invalidIds, range) {
  for (let i = range[0]; i <= range[1]; i++) {
    const isInvalid = isInvalidId(i);
    if (isInvalid) {
      invalidIds.push(i);
    }
  }
}

main(input => {
  const ranges = input
    .split(',')
    .map(x => x
      .split('-')
      .map(n => Number.parseInt(n))
    );
  if (DEBUG_MODE) {
    const operations = ranges.reduce((sum, r) => sum + (r[1] - r[0]), 0);
    console.log(`Performing ${operations} operations.`);
  }
  const invalidIds = [];

  for (const range of ranges) {
    addInvalidIds(invalidIds, range);
  }

  if (DEBUG_MODE) {
    console.log(`Found ${invalidIds.length} invalid IDs:`);
    console.log(invalidIds);
  }
  const sumOfInvalidIds = invalidIds
    .reduce((sum, id) => sum + id, 0);
  return sumOfInvalidIds;
});

