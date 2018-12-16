const fs = require('fs');

const INPUT_FILENAME = '03.input.txt';
// const INPUT_FILENAME = '03.test.txt';

const input = fs.readFileSync(INPUT_FILENAME, { encoding: 'utf-8' }).trim();
const fabrics = input
  .split('\n')
  // Limit used for debugging purposes only
  // .filter((obj, index) => index < 10)
  .map(line => {
    const [id, parts] = line.substring(1).split(' @ ');
    const [XY, dims] = parts.split(': ');
    return {
      id: parseInt(id),
      x: parseInt(XY.split(',')[0]),
      y: parseInt(XY.split(',')[1]),
      width: parseInt(dims.split('x')[0]),
      height: parseInt(dims.split('x')[1]),
      toString() { return `${this.id} @ ${this.x},${this.y}: ${this.width}x${this.height}`; },
    }
  });

const getCanvas = fabrics => {
  let minX = fabrics[0].x;
  let minY = fabrics[0].y;
  let maxX = fabrics[0].x + fabrics[0].width;
  let maxY = fabrics[0].y + fabrics[0].height;

  for (let index = 0; index < fabrics.length; index++) {
    if (fabrics[index].x < minX) {
      minX = fabrics[index].x;
    }
    if (fabrics[index].y < minY) {
      minY = fabrics[index].y;
    }
    if (fabrics[index].x + fabrics[index].width > maxX) {
      maxX = fabrics[index].x + fabrics[index].width;
    }
    if (fabrics[index].y + fabrics[index].height > maxY) {
      maxY = fabrics[index].y + fabrics[index].height;
    }
  }
  const canvas = [];
  for (let y = 0; y < maxY; y++) {
    const row = [];
    for (let x = 0; x < maxX; x++) {
      row.push([]);
    }
    canvas.push(row);
  }
  return canvas;
}

const applyFabricToCanvas = (canvas, fabric) => {
  for (y = fabric.y; y < fabric.y + fabric.height; y++) {
    for (x = fabric.x; x < fabric.x + fabric.width; x++) {
      canvas[y][x].push(fabric.id);
    }
  }
};

const applyFabricsToCanvas = (canvas, fabrics) =>
  fabrics.forEach(fabric => applyFabricToCanvas(canvas, fabric));

const getPureClaims = (fabrics, canvas) =>
  fabrics
    .map(fabric => fabric.id)
    .filter(fabricId => {
      let isPure = true;
      for (let y = 0; y < canvas.length && isPure; y++) {
        for (let x = 0; x < canvas[0].length && isPure; x++) {
          if (canvas[y][x].includes(fabricId)) {
            isPure = canvas[y][x].length === 1;
          }
        }
      }
      return isPure;
    });

const main = fabrics => {
  // console.log(fabrics.map(fabric => fabric + ''));
  const canvas = getCanvas(fabrics);
  applyFabricsToCanvas(canvas, fabrics);
  // console.log(canvas);
  const pureClaims = getPureClaims(fabrics, canvas);
  console.log(pureClaims);
};

main(fabrics);

