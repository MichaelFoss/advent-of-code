import main from '../utils/main.js';

const DEBUG_MODE = false;

function sortRanges(ranges) {
  ranges.sort((r1, r2) => {
    const startDiff = r1[0] - r2[0];
    if (startDiff !== 0) {
      return startDiff;
    }
    const endDiff = r1[1] - r2[1];
    return endDiff;
  });
}

function combineRanges(ranges) {
  sortRanges(ranges);
  if (DEBUG_MODE) {
    console.log('[COMBINING RANGES]');
    console.log(ranges);
  }
  for (let i = 0; i < ranges.length - 1; i++) {
    const r1 = ranges[i];
    for (let j = i + 1; j < ranges.length; j++) {
      const r2 = ranges[j];
      if (DEBUG_MODE) {
        console.log(r1, r2);
      }
      // Both have same start
      if (r1[0] === r2[0]) {
        r1[1] = Math.max(r1[1], r2[1]);
        ranges = [...ranges.slice(0, j), ...ranges.slice(j + 1)];
        if (DEBUG_MODE) {
          console.log(`[i=${i}, j=${j}] Same start, ${r1} ${r2}`);
          console.log(ranges);
        }
        j--;
      }
      // The end of the current overlaps the start of the next
      else if (r1[1] >= r2[0]) {
        r1[1] = Math.max(r1[1], r2[1]);
        ranges = [...ranges.slice(0, j), ...ranges.slice(j + 1)];
        if (DEBUG_MODE) {
          console.log(`[i=${i}, j=${j}] Overlap of r1 and r2, ${r1} ${r2}`);
          console.log(ranges);
        }
        j--;
      }
    }
  }
  return ranges;
}

function parseInput(input) {
  let ranges = [];
  const lines = input.split('\n\n')[0].split('\n');
  for (const line of lines) {
    const [startRange, endRange] = line
      .split('-')
      .map((s) => Number.parseInt(s));
    ranges.push([startRange, endRange]);
  }
  ranges = combineRanges(ranges);
  return ranges;
}

function getRangeCount(range) {
  const [start, end] = range;
  const count = end - start + 1;
  if (DEBUG_MODE) {
    console.log(`  ${end} - ${start} + 1 = ${end - start + 1}`);
  }
  return count;
}

function getRangesCount(ranges) {
  let count = 0;
  for (const range of ranges) {
    count += getRangeCount(range);
  }
  return count;
}

main((input) => {
  const ranges = parseInput(input);
  const rangeCount = getRangesCount(ranges);
  return rangeCount;
});
