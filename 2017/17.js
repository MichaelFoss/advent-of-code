function part1() {
  const buffer = [0];

  const MAX_INSERTS = 2017;
  const MAX_STEPS = 349;
  //const MAX_STEPS = 3; // Test data = 638
  let pos = 0;

  function movePosition(buffer, pos) {
    for (let i = 0; i < MAX_STEPS; i++) {
      pos++;
    }
    while (pos >= buffer.length) {
      pos -= buffer.length;
    }
    return pos;
  }

  function insertAfter(buffer, pos, i) {
    buffer.splice(pos + 1, 0, i + 1);
  }

  function valAfterPos(buffer, pos) {
    if (pos === buffer.length) {
      return buffer[0];
    }
    else {
      return buffer[pos + 1];
    }
  }

  for (let i = 0; i < MAX_INSERTS; i++) {
    pos = movePosition(buffer, pos);
    insertAfter(buffer, pos, i);
    pos++;
    if (pos === buffer.length) {
      pos = 0;
    }
  }

  console.log(valAfterPos(buffer, pos));
}

function part2() {
  // Initial setup: [0, (1)]
  let bufferLength = 2;
  let pos = 1;
  let indexOfZero = 0;
  let valueAfterZero = 1;

  const MAX_INSERTS = 50000000;
  const MAX_STEPS = 349;
  const DEBUG_EVERY = 10000;

  /*
  const MAX_INSERTS = 10;
  const MAX_STEPS = 3;
  const DEBUG_EVERY = 1;
  */

  function movePosition(bufferLength, pos) {
    pos += MAX_STEPS + 1;
    while (pos >= bufferLength) {
      pos -= bufferLength;
    }
    return pos;
  }

  while (bufferLength <= MAX_INSERTS) {
    // Find place to add next number
    pos = movePosition(bufferLength, pos);

    // "Insert" next number (bufferLength)
    // buffer.splice(pos + 1, 0, bufferLength);
    bufferLength++;
    if (pos <= indexOfZero) {
      indexOfZero++;
    }
    // Update the val after 0 if needed;
    // we only care what the number is if it's inserted after 0
    else if (pos === indexOfZero + 1) {
      valueAfterZero = bufferLength - 1;
    }

    if (bufferLength % DEBUG_EVERY  === 0) {
      console.log(`buffer.length = ${bufferLength}, buffer[${indexOfZero} + 1] = ${valueAfterZero}`);
    }
  }

  console.log(valueAfterZero);
}

part2();
