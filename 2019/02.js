const fs = require('fs');

// 9706670
const REPLACE_ENTRIES = true;
const INPUT_FILE = '02.input.txt';
// 3500
// const REPLACE_ENTRIES = false;
// const INPUT_FILE = '02.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
    .split(',')
    .map(x => parseInt(x));

// Requirements per the original problem ¯\_(ツ)_/¯
if (REPLACE_ENTRIES) {
    data[1] = 12;
    data[2] = 2;
}

const MAX_OPS = 1000;

const main = code => {
    let opPointer = 0;
    let ops = 0;

    try {
        while (code[opPointer] !== 99 && ops < MAX_OPS) {
            switch (code[opPointer]) {
                case 1:
                    code[code[opPointer + 3]] = code[code[opPointer + 1]] + code[code[opPointer + 2]];
                    break;

                case 2:
                    code[code[opPointer + 3]] = code[code[opPointer + 1]] * code[code[opPointer + 2]];
                    break;

                default:
                    throw new Error(`Unknown operator ${code[code[opPointer]]} in ${opPointer}.`);
            }
            opPointer += 4;
            ops++;
        }

        if (ops === MAX_OPS) {
            throw new Error(`Operations exceeded MAX_OPS of ${MAX_OPS}.`);
        }
        else {
            return code[0];
        }
    }
    catch (err) {
        throw err;
    }
};

console.log(main(data));

