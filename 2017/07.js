// Store input text from http://adventofcode.com/2017/day/7/input in window.localStorage.data

(() => {

const node = function(nodeStr) {
  let parts;
  parts = nodeStr.split(' (');
  this.name = parts[0];
  parts = parts[1].split(')');
  this.weight = parseInt(parts[0]);
  if (parts[1].length) {
    parts = parts[1].split(' -> ');
    this.childNodeNames = parts[1].split(', ');
  }
  else {
    this.childNodeNames = [];
  }
  this.childNodes = {};
}

let nodes = window.localStorage.data.split('\n').map(nodeStr => new node(nodeStr));

while (nodes.length !== 1) {
  let i = nodes.findIndex(node => node.childNodeNames.length === 0);
  // If the node has no children...
  if (nodes[i].childNodeNames.length === 0) {
    // ...add it to the node where it is a child...
    let childIndex;
    const indexOfParent = nodes.findIndex(node => {
      childIndex = node.childNodeNames.findIndex(childNodeName => childNodeName === nodes[i].name);
      return (childIndex !== -1);
    });
    nodes[indexOfParent].childNodes[nodes[i].name] = nodes[i];
    // ...remove the name of the child...
    nodes[indexOfParent].childNodeNames.splice(childIndex, 1);
    // ...and remove it from the node list
    nodes.splice(i, 1);
  }
}
nodes = nodes[0];
nodes.isRoot = true;

function cleanUpNode(node) {
  delete node.childNodeNames;
  node.isRoot = !!node.isRoot;
  Object.keys(node.childNodes).map(childNodeName => cleanUpNode(node.childNodes[childNodeName]));
}

function calculateExtraWeights(node) {
  if (node.childNodes.length === 0) {
    node.towerWeight = node.weight;
    node.discWeight = 0;
  }
  else {
    const childNodeNames = Object.keys(node.childNodes);
    childNodeNames.map(childNodeName => calculateExtraWeights(node.childNodes[childNodeName]));
    node.towerWeight = node.weight + childNodeNames.reduce((sum, childNodeName) => sum + node.childNodes[childNodeName].towerWeight, 0);
    node.discWeight = node.towerWeight - node.weight;
  }
}

calculateExtraWeights(nodes);
cleanUpNode(nodes);

console.log(nodes);

})();
