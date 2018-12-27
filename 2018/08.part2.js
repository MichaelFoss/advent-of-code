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
    return this.metaData.reduce((sum, metaData) => sum + metaData, 0);
  }

  get allMetaDataSum() {
    let sum = this.metaDataSum;
    this.children.forEach(child => sum += child.allMetaDataSum);
    return sum;
  }

  get value() {
    if (this.children.length === 0) {
      return this.metaDataSum;
    }
    let sum = 0;
    for (let i = 0; i < this.metaData.length; i++) {
      const index = this.metaData[i] - 1;
      if (index < this.children.length) {
        sum += this.children[index].value;
      }
    }
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
  const allMetaDataSum = tree.children[0].allMetaDataSum;
  const value = tree.children[0].value;
  return `MetaData: ${allMetaDataSum}, Value: ${value}`;
}

console.log(main(data));

