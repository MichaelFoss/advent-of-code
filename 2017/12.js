// Yes, this is HIGHLY unoptimized. I don't give a care.
// V8 is strong, and I needed this done fast.

// Part 1
(() => {

class Node {
  constructor(key, pipes) {
    // Display this property first
    this.display = '';
    this.key = key;
    this.pipes = [...pipes];
    this.isConnected = this.key === 0;
    this.display = this.toString();
  }
}

Node.prototype.toString = function() {
  return `${this.key}: [${this.isConnected ? 'X' : ' '}] ${this.pipes.join(',')}`;
}

// const data = `0 <-> 2
// 1 <-> 1
// 2 <-> 0, 3, 4
// 3 <-> 2, 4
// 4 <-> 2, 3, 6
// 5 <-> 6
// 6 <-> 4, 5` // 6: 0, 2, 3, 4, 5, 6
const data = window.localStorage.input
.split('\n').map(x => {
  const parts = x.split(' <-> ');
  const key = parseInt(parts[0]);
  const pipes = parts[1].split(', ').map(x => parseInt(x));
  return new Node(key, pipes);
});

function isConnected(data, indexToCheck, checkedAlready = []) {
  checkedAlready.push(indexToCheck);
  for (let i = 0; i < data[indexToCheck].pipes.length; i++) {
    const currentPipeIndex = data[indexToCheck].pipes[i];
    if (data[currentPipeIndex].isConnected) {
      return true;
    }
    if (checkedAlready.indexOf(currentPipeIndex) === -1) {
      if (isConnected(data, currentPipeIndex, [...checkedAlready])) {
        return true;
      }
    }
  }
  return false;
}

let tryAgainKid;

do {
  tryAgainKid = false;
  for (let i = 1; i < data.length; i++) {
    // If the room is not connected, look for an escape
    if (!data[i].isConnected) {
      if (isConnected(data, i)) {
        tryAgainKid = true;
        data[i].isConnected = true;
        data[i].display = data[i].toString();
      }
    }
    console.log(`Pass complete (try again: ${tryAgainKid}), Total connected nodes: ${data.reduce((sum, node) => sum + (node.isConnected ? 1 : 0), 0)}`);
  }
} while (tryAgainKid);

console.log(data.map(x => x.display).join('\n') + '\n\nTotal connected nodes: ' + data.reduce((sum, node) => sum + (node.isConnected ? 1 : 0), 0));

})();


// Part 2
(() => {

class Node {
  constructor(key, pipes) {
    // Display this property first
    this.display = '';
    this.key = key;
    this.pipes = [...pipes];
    this.isConnected = false;
    this.display = this.toString();
  }
}

Node.prototype.toString = function() {
  return `[${this.isConnected ? 'X' : ' '}] ${this.pipes.join(',')}`;
}

// const data = `0 <-> 2
// 1 <-> 1
// 2 <-> 0, 3, 4
// 3 <-> 2, 4
// 4 <-> 2, 3, 6
// 5 <-> 6
// 6 <-> 4, 5` // 6: (0, 2, 3, 4, 5, 6) & (1) = 2
const data = window.localStorage.input
.split('\n').map(x => {
  const parts = x.split(' <-> ');
  const key = parseInt(parts[0]);
  const pipes = parts[1].split(', ').map(x => parseInt(x));
  return new Node(key, pipes);
});

// See if a node is connected
function isConnected(data, indexToCheck, checkedAlready = []) {
  checkedAlready.push(indexToCheck);
  for (let i = 0; i < data[indexToCheck].pipes.length; i++) {
    const currentPipeIndex = data[indexToCheck].pipes[i];
    if (data[currentPipeIndex].isConnected) {
      return true;
    }
    if (checkedAlready.indexOf(currentPipeIndex) === -1) {
      if (isConnected(data, currentPipeIndex, [...checkedAlready])) {
        return true;
      }
    }
  }
  return false;
}

// Reduce the group by removing all connected nodes
function removeGroup(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].isConnected) {
      data.splice(i, 1);
      for (let j = 0; j < data.length; j++) {
        if (!data[j].isConnected) {
          data[j].pipes = data[j].pipes.map(x => x > i ? x - 1 : x);
          data[j].display = data[j].toString();
        }
      }
      i--;
    }
  }
}

let groupCount = 0;

do {
  let tryAgainKid;
  data[0].isConnected = true;

  do {
    tryAgainKid = false;
    for (let i = 1; i < data.length; i++) {
      // If the room is not connected, look for an escape
      if (!data[i].isConnected) {
        if (isConnected(data, i)) {
          tryAgainKid = true;
          data[i].isConnected = true;
          data[i].display = data[i].toString();
        }
      }
      console.log(`Pass complete (try again: ${tryAgainKid}), Total connected nodes: ${data.reduce((sum, node) => sum + (node.isConnected ? 1 : 0), 0)}`);
    }
  } while (tryAgainKid);

  removeGroup(data);
  groupCount++;

  // Take care of scenario where it's the last node
  if (data.length === 1) {
    data.pop();
    groupCount++;
  }
} while (data.length > 0);

console.log(`Total groups: ${groupCount}`);

})();
