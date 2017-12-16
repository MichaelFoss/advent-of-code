function part1() {
  const SAMPLE_SIZE = 40000000;
  const DIVISOR = 2147483647;
  const FACTOR = {
    A: 16807,
    B: 48271
  }
  // Test Data = 588
/*
  let value = {
    A: 65,
    B: 8921
  }
*/
  // Actual Data
  let value = {
    A: 277,
    B: 349
  }

  let count = 0;

  for (let i = 0; i < SAMPLE_SIZE; i++) {
    // Increment the numbers
    value.A = value.A * FACTOR.A % DIVISOR;
    value.B = value.B * FACTOR.B % DIVISOR;

    // If the last 4 hex digits are the same, the last 16 bits are the same
    if (value.A.toString(16).substr(-4) === value.B.toString(16).substr(-4)) {
      count++;
      console.log(`${count} found at i = ${i}`);
    }
  }

  console.log(count);
}

function part2() {
  const SAMPLE_SIZE = 5000000;
  const DIVISOR = 2147483647;
  const FACTOR = {
    A: 16807,
    B: 48271
  }
  // Actual Data
  let value = {
    A: 277,
    B: 349
  }

  let count = 0;

  for (let i = 0; i < SAMPLE_SIZE; i++) {
    // Increment the numbers
    do {
      value.A = value.A * FACTOR.A % DIVISOR;
    } while (value.A % 4 !== 0);
    do {
      value.B = value.B * FACTOR.B % DIVISOR;
    } while (value.B % 8 !== 0);

    // If the last 4 hex digits are the same, the last 16 bits are the same
    if (value.A.toString(16).substr(-4) === value.B.toString(16).substr(-4)) {
      count++;
      console.log(`${count} found at i = ${i}`);
    }
  }

  console.log(count);
}

part2();
