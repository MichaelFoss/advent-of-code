const FILENAME = './23.input.txt';
const MAX_INSTRUCTIONS = Infinity;
const DEBUG_EVERY = 1e6;
const DEBUG_MODE = true;
const PART = 2;

function run() {
  const instructions = require('fs').readFileSync(FILENAME, 'utf8')
    .split('\n')
    .map(x => x.trim())
    .map(x => {
      const params = x.split(' ');
      const op = params.shift();
      return {
        op,
        params: params.map(x => isNaN(parseInt(x)) ? x : parseInt(x))
      }
    });

  function debug(op, params) {
    console.log(`[${instructionCount}] ${i}: ${op} ${params[0]} ${params[1]} (${mulCount}) [${Object.keys(regs).map(reg => regs[reg]).join(',')}]`);
  }

  function getVal(regs, x) {
    if (isNaN(parseInt(x))) {
      return regs[x];
    }
    else {
      return parseInt(x);
    }
  }

  const regs = {};
  for (let i = 0; i < 8; i++) {
    regs[String.fromCharCode('a'.charCodeAt(0) + i)] = 0;
  }
  regs.a = PART - 1;
  let i = 0;
  let mulCount = 0;
  instructionCount = 0;
  do {
    instructionCount++;
    const { op, params } = instructions[i];
    if (instructionCount % DEBUG_EVERY === 0 && DEBUG_MODE) {
      console.log(`[${instructionCount} / ${MAX_INSTRUCTIONS}]`);
      debug(op, params);
    }
    let jumped = false;
    switch (op) {
      case 'set':
        regs[params[0]] = getVal(regs, params[1]);
        break;
      case 'sub':
        regs[params[0]] -= getVal(regs, params[1]);
        break;
      case 'mul':
        regs[params[0]] *= getVal(regs, params[1]);
        mulCount++;
        break;
      case 'jnz':
        if (getVal(regs, params[0]) !== 0) {
          i += getVal(regs, params[1]);
          jumped = true;
        }
        break;
    }
    if (!jumped) {
      i++;
    }
  } while (i < instructions.length && instructionCount <= MAX_INSTRUCTIONS);
  console.log(mulCount);
  debug();
}

run();

