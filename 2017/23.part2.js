function debug() {
  console.log(`[${a}, ${b}, ${c}, ${d}, ${e}, ${f}, ${g}, ${h}`);
}

let a = 1;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let f = 0;
let g = 0;
let h = 0;

b = 79;
c = 79;

b *= 100;
b += 100000;
c = b;
c += 17000;

do {
  f = 1;
  d = 2;

  do {
    // Yes, this is ridiculously slow
    // and there's a better way;
    // oh well
    for (e = 2; f !== 0 && e - 1 - b !== 0; e++) {
      if (d * e - b === 0) {
        f = 0;
      }
    }
    d++;
  } while (d - b !== 0);

  if (f === 0) {
    h++;
  }
  b += 17;
} while (b - c - 17 !== 0);

debug();

