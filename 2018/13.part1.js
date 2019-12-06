const fs = require('fs');
const Graph = require('./13.Graph.js');

// const INPUT_FILE = '13.input.txt';
const INPUT_FILE = '13.test.txt';

const data = fs.readFileSync(INPUT_FILE, 'utf-8').trim();

const main = (data) => {
  const graph = new Graph(data);
  do {
    graph.step();
  } while (graph.crashes.length === 0);
  return graph.crashes;
}

console.log(main(data));

