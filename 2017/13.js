function part1() {

class Scanner {
  static get DIRECTION_UP() { return -1 }
  static get DIRECTION_DOWN() { return 1; }

  constructor(depth, maxRange) {
    this.maxRange = maxRange;
    this.depth = depth;
    this.reset();
  }

  advance(distance = 1) {
    while (distance > 0) {
      // If we're going down and we're at the end, change direction
      if (this.position + this.direction === this.maxRange) {
        this.direction = Scanner.DIRECTION_UP;
      }

      // If we're going up and we're at the end, change direction
      if (this.position + this.direction === -1) {
        this.direction = Scanner.DIRECTION_DOWN;
      }

      // Move
      this.position += this.direction;
      distance--;
    }
  }

  reset() {
    this.position = 0;
    this.direction = Scanner.DIRECTION_DOWN;
  }

  isAlerted() { return this.position === 0; }
}

const scanners =
/*
`0: 3
1: 2
4: 4
6: 4` // Test = 24
*/
`0: 3
1: 2
2: 5
4: 4
6: 6
8: 4
10: 8
12: 8
14: 6
16: 8
18: 6
20: 6
22: 8
24: 12
26: 12
28: 8
30: 12
32: 12
34: 8
36: 10
38: 9
40: 12
42: 10
44: 12
46: 14
48: 14
50: 12
52: 14
56: 12
58: 12
60: 14
62: 14
64: 12
66: 14
68: 14
70: 14
74: 24
76: 14
80: 18
82: 14
84: 14
90: 14
94: 17`
  .split('\n')
  .map(line => {
    const parts = line.split(': ');
    return new Scanner(parseInt(parts[0]), parseInt(parts[1]));
  });

const MAX_DEPTH = scanners.reduce((maxDepth, scanner) => Math.max(maxDepth, scanner.depth), -1);

let delay = 0;
let severity;
let isCaught;

do {
  severity = 0;
  isCaught = false;
  scanners.forEach(scanner => {
    scanner.reset();
    scanner.advance(delay);
  });
  for (let packetDepth = 0; packetDepth <= MAX_DEPTH; packetDepth++) {
    // Look for a scanner in range
    const scanner = scanners.find(scanner => scanner.depth === packetDepth);

    // If one is found and it's looking at us, bump the severity
    if (scanner && scanner.isAlerted()) {
      severity += scanner.maxRange * scanner.depth;
      isCaught = true;
    }

    // Move the scanners
    scanners.forEach(scanner => scanner.advance());
  }

  console.log(`Delay: ${delay}; Severity: ${severity}; Caught: ${isCaught}`);

  // We can skip every other delay thanks to scanner #1
  delay += 2;

} while (severity !== 0);

}



function part2() {

class Scanner {
  constructor(depth, range) {
    this.range = (range - 1) * 2;
    this.depth = depth;
  }
}

testData = `0: 3
1: 2
4: 4
6: 4`; // Test = 10

scannerData = `0: 3
1: 2
2: 5
4: 4
6: 6
8: 4
10: 8
12: 8
14: 6
16: 8
18: 6
20: 6
22: 8
24: 12
26: 12
28: 8
30: 12
32: 12
34: 8
36: 10
38: 9
40: 12
42: 10
44: 12
46: 14
48: 14
50: 12
52: 14
56: 12
58: 12
60: 14
62: 14
64: 12
66: 14
68: 14
70: 14
74: 24
76: 14
80: 18
82: 14
84: 14
90: 14
94: 17`;

const STARTING_POINT = 2500000;
const MAX_DELAY = STARTING_POINT * 3;
const scanners =
  scannerData
  // testData
  .split('\n')
  .map(line => {
    const parts = line.split(': ');
    return new Scanner(parseInt(parts[0]), parseInt(parts[1]));
  });

function isSeen(delay, scanner) {
  return (delay + scanner.depth) % scanner.range === 0;
}

// Returns who you are first seen by, or undefined if nobody
function isSeenAll(delay, scanners) {
  for (let i = 0; i < scanners.length; i++) {
    if (isSeen(delay, scanners[i])) {
      return i;
    }
  }
  return undefined;
}

let seenBy;
let delay = STARTING_POINT - 1;
do {
  delay++;
  seenBy = isSeenAll(delay, scanners);
  console.log(`@${delay}, found by ${seenBy}`);
} while (seenBy !== undefined && delay !== MAX_DELAY);

}

part2();

