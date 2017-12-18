// Part 1

function part1() {
  // Actual data
  const instructions = require('fs').readFileSync('./18.input.txt', 'utf8')

  // Test data = 4
/*
  const instructions = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`
*/
    .split('\n')
    .map(x => {
      const params = x.split(' ');
      const op = params.shift();
      return {
        op,
        params: params.map(x => isNaN(parseInt(x)) ? x : parseInt(x))
      }
    });

  function getVal(x) {
    if (isNaN(parseInt(x))) {
      return regs[x];
    }
    else {
      return x;
    }
  }

  let i = 0;
  let sound = undefined;
  let recovered = undefined;
  const regs = [];
  do {
    const { op, params } = instructions[i];
    // console.log(`@${i}: ${op} ${params}`);
    let jumped = false;
    switch (op) {
      case 'snd':
        sound = getVal(params[0]);
        break;
      case 'set':
        regs[params[0]] = getVal(params[1]);
        break;
      case 'add':
        regs[params[0]] += getVal(params[1]);
        break;
      case 'mul':
        regs[params[0]] *= getVal(params[1]);
        break;
      case 'mod':
        regs[params[0]] = regs[params[0]] % getVal(params[1]);
        break;
      case 'rcv':
        const rcv = getVal(params[0]);
        if (rcv !== 0) {
          recovered = sound;
        }
        break;
      case 'jgz':
        if (getVal(params[0]) > 0) {
          i += getVal(params[1]);
          jumped = true;
        }
        break;
    }
    if (!jumped) {
      i++;
    }
  } while (i < instructions.length && !recovered);
  console.log(recovered);
}

// Part 2

function part2() {
  const FILENAME = './18.input.txt';
  // const FILENAME = './18.test.txt';
  // Some safety measures
  const MAX_LOOPS = 1e9;
  let loopCount = 1;

  // When to show some output
  const DEBUG_AROUND = 1e7;

  // Actual data
  const instructions = require('fs').readFileSync(FILENAME, 'utf8')
    .split('\n')
    .map(x => {
      const params = x.split(' ');
      const op = params.shift();
      return {
        op,
        params: params.map(x => isNaN(parseInt(x)) ? x : parseInt(x))
      }
    });

  function serialize() {
    return JSON.stringify({
      p,
      i,
      regs,
      sndCount1,
      dataQueue,
      loopCount
    });
  }

  function deserialize(s) {
    const obj = JSON.parse(s);
    p = obj.p;
    i = [...obj.i];
    regs = [...obj.regs];
    sndCount1 = obj.sndCount1;
    dataQueue = [...obj.dataQueue];
    loopCount = obj.loopCount;
  }

  function getVal(x) {
    if (isNaN(parseInt(x))) {
      return regs[p][x];
    }
    else {
      return x;
    }
  }

  /**
   * Determines if a program cannot make progress.
   */
  function isStalled(programNumber) {
    return (
      // Pointer is pointing outside the instruction set
      i[programNumber] >= instructions.length ||
      // Program is waiting for data from other program
      instructions[i[programNumber]].op === 'rcv' && dataQueue[programNumber].length === 0
    );
  }

  // Program 0 & 1 instruction pointers
  let i = [0, 0];
  // The program whose turn it is
  let p = 1;
  // The queue of data that is ready to be received
  let dataQueue = [[], []];
  // The registers for each program
  let regs = [
    {
      p: 0
    },
    {
      p: 1
    }
  ];
  // The number of times program 1 sent data to program 0
  let sndCount1 = 0;
  let op;
  let params;
  let lastInstruction = 'NULL';
  console.log(`[${lastInstruction}] ${serialize()}`);
  do {
    // If we're waiting on a program, switch to the other program
    if (instructions[i[p]].op === 'rcv' && dataQueue[p].length === 0) {
      p = 1 - p;
    }

    // Get the current instruction
    if (i[p] >= instructions.length) {
      console.log(`[${loopCount}] i[p]=${i[p]}, cannot extract instruction, pausing ${p} execution`);
      loopCount++;
      continue;
    }

    op = instructions[i[p]].op;
    params = instructions[i[p]].params;
    lastInstruction = `${op}:${params.join(',')}`;

    // Automatically move to the next instruction
    // after executing the current one
    // unless this is set to false
    let autoJump = true;

    // Execute the instruction
    switch (op) {
      case 'snd':
        dataQueue[1 - p].push(getVal(params[0]));
        if (p === 1) {
          sndCount1++;
        }
        break;
      case 'set':
        regs[p][params[0]] = getVal(params[1]);
        break;
      case 'add':
        regs[p][params[0]] += getVal(params[1]);
        break;
      case 'mul':
        regs[p][params[0]] *= getVal(params[1]);
        break;
      case 'mod':
        regs[p][params[0]] = regs[p][params[0]] % getVal(params[1]);
        break;
      case 'rcv':
        regs[p][params[0]] = dataQueue[p].shift();
        break;
      case 'jgz':
        if (getVal(params[0]) > 0) {
          i[p] += getVal(params[1]);
          autoJump = false;
        }
        break;
    }

    // Jump to the next instruction if necessary
    if (autoJump) {
      i[p]++;
    }
    loopCount++;
    if (loopCount % DEBUG_AROUND <= 3) {
      console.log(`[${lastInstruction}] ${serialize()}`);
    }
  } while ((!isStalled(0) || !isStalled(1)) && loopCount <= MAX_LOOPS);
  console.log(`Program 1 snd count: ${sndCount1}`);
}

part1();
part2();

