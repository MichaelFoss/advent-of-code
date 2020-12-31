const main = require('../utils/main.js');

main(input => {
  const boxes = input
    .split('\n')
    .map(x => x.split('x').map(y => Number(y)));

  const getSurfaceArea = box => (box[0] * box[1] + box[1] * box[2] + box[0] * box[2]) * 2;
  const getSmallestArea = box => Math.min(box[0] * box[1], box[1] * box[2], box[0] * box[2]);

  const getVolume = box => box[0] * box[1] * box[2];
  const getShortestDistance = box => Math.min(box[0] + box[1], box[1] + box[2], box[0] + box[2]) * 2;

  const totalSquareFeet = boxes
    .reduce((sum, curr) => (
      sum +
      getSurfaceArea(curr) +
      getSmallestArea(curr)
    ), 0);

  const totalRibbon = boxes.reduce((sum, curr) => {
    const total =
      getShortestDistance(curr) +
      getVolume(curr);
    return sum + total;
  }, 0);

  return {
    part1: totalSquareFeet,
    part2: totalRibbon,
  }
});
