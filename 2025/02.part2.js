import main from "../utils/main.js";

const DEBUG_MODE = false;

const regExpMap = new Map();

function areInvalidIdParts(parts) {
  for (let i = 1; i < parts.length; i++) {
    if (parts[0] !== parts[i]) {
      return false;
    }
  }
  return true;
}

function getRegExp(n) {
  if (!regExpMap.has(n)) {
    regExpMap.set(n, new RegExp(`.{1,${n}}`, "g"));
  }
  return regExpMap.get(n);
}

function isInvalidId(n) {
  if (n < 10) {
    return false;
  }
  const s = n.toString();
  // Quick optimization: if the number is of odd length,
  // then there can be no 2-part comparisons,
  // and the most we can hope for is 3-part
  const maxPartLengths = s.length % 2 === 1 ? s.length / 3 + 1 : s.length / 2;
  for (let partLengths = 1; partLengths <= maxPartLengths; partLengths++) {
    const parts = s.match(getRegExp(partLengths));
    if (areInvalidIdParts(parts)) {
      if (DEBUG_MODE) {
        console.log(`❌ ${s} (${parts[0]} x${parts.length})`);
      }
      return true;
    }
  }
  return false;
}

function addInvalidIds(invalidIds, range) {
  for (let i = range[0]; i <= range[1]; i++) {
    const isInvalid = isInvalidId(i);
    if (isInvalid) {
      invalidIds.push(i);
    }
  }
}

main((input) => {
  const ranges = input
    .split(",")
    .map((x) => x.split("-").map((n) => Number.parseInt(n)));
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
  const sumOfInvalidIds = invalidIds.reduce((sum, id) => sum + id, 0);
  return sumOfInvalidIds;
});
