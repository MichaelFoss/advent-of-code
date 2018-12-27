const fs = require('fs');

const INPUT_FILE = '08.input.txt';
// const INPUT_FILE = '08.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8').trim()
  .split(' ')
  .map(x => parseInt(x))
;

class Node {
  constructor() {
    this.children = [];
    this.metaData = [];
  }

  get metaDataSum() {
    let sum = this.metaData.reduce((sum, metaData) => sum + metaData, 0);
    this.children.forEach(child => sum += child.metaDataSum);
    return sum;
  }
}

const addNode = ({ pointer, tree, data }) => {
  const childCount = data[pointer];
  pointer++;
  const metaDataCount = data[pointer];
  pointer++;
  const node = new Node();
  for (let i = 0; i < childCount; i++) {
    pointer = addNode({ pointer, tree: node, data });
  }
  for (let i = 0; i < metaDataCount; i++) {
    node.metaData.push(data[pointer]);
    pointer++;
  }
  tree.children.push(node);
  return pointer;
};

const buildTree = data => {
  const tree = new Node();
  let pointer = 0;
  while (pointer < data.length) {
    pointer = addNode({ pointer, tree, data });
  }
  return tree;
};

const main = (data) => {
  const tree = buildTree(data);
  const metaDataSum = tree.metaDataSum;
  return metaDataSum;
}

console.log(main(data));

