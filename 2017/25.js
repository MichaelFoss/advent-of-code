MAX_ITERATIONS = 12667664;

const STATE = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F'
};

const DIR = {
  LEFT:   'LEFT',
  RIGHT:  'RIGHT'
};

function _write(val) {
  let index;
  switch (true) {
    case (pos === 0):
      data.middle = val;
      break;

    case (pos < 0):
      index = (pos - 1) * -1;
      while (index > data.left.length) {
        data.left.push(0);
      }
      data.left[index] = val;
      break;

    case (pos > 0):
      index = (pos - 1);
      while (index > data.right.length) {
        data.right.push(0);
      }
      data.right[index] = val;
      break;
  }
}

function checkSum(data) {
  return (
    data.middle +
    data.left.reduce((sum, val) => sum + val, 0) +
    data.right.reduce((sum, val) => sum + val, 0)
  );
}

function isSet() {
  switch (true) {
    case (pos === 0):
      return data.middle;
      break;
    case (pos < 0):
      return data.left[(pos - 1) * -1];
      break;
    case (pos > 0):
      return data.right[pos - 1];
      break;
  }
}

function set(val) {
  _write(val === 1);
}

function move(dir) {
  if (dir === DIR.LEFT) {
    pos--;
  }
  else if (dir === DIR.RIGHT) {
    pos++;
  }
}

let state = STATE.A;
let pos = 0;
const data = {
  middle: 0,
  right: [],
  left: []
};

for (let i = 1; i <= MAX_ITERATIONS; i++) {
  switch (state) {
    case STATE.A:
      if (!isSet()) {
        set(1);
        move(DIR.RIGHT);
        state = STATE.B;
      }
      else {
        set(0);
        move(DIR.LEFT);
        state = STATE.C;
      }
      break;

    case STATE.B:
      if (!isSet()) {
        set(1);
        move(DIR.LEFT);
        state = STATE.A;
      }
      else {
        set(1);
        move(DIR.RIGHT);
        state = STATE.D;
      }
      break;

    case STATE.C:
      if (!isSet()) {
        set(0);
        move(DIR.LEFT);
        state = STATE.B;
      }
      else {
        set(0);
        move(DIR.LEFT);
        state = STATE.E;
      }
      break;

    case STATE.D:
      if (!isSet()) {
        set(1);
        move(DIR.RIGHT);
        state = STATE.A;
      }
      else {
        set(0);
        move(DIR.RIGHT);
        state = STATE.B;
      }
      break;

    case STATE.E:
      if (!isSet()) {
        set(1);
        move(DIR.LEFT);
        state = STATE.F;
      }
      else {
        set(1);
        move(DIR.LEFT);
        state = STATE.C;
      }
      break;

    case STATE.F:
      if (!isSet()) {
        set(1);
        move(DIR.RIGHT);
        state = STATE.D;
      }
      else {
        set(1);
        move(DIR.RIGHT);
        state = STATE.A;
      }
      break;

  }
}

console.log(`Checksum: ${checkSum(data)}`);

