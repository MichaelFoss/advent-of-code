const fs = require('fs');

// 12, 2
const TARGET = 19690720;
const INPUT_FILE = '02.input.txt';
// 9, 10
// const TARGET = 3500;
// const INPUT_FILE = '02.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
    .split(',')
    .map(x => parseInt(x));

const MAX_OPS = 1000;

const runProgram = (code, noun, verb, target) => {
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
            if (code[0] !== target) {
                throw new Error(`${code[0]} !== ${target}.`);
            }
            else {
                return { noun, verb };
            }
        }
    }
    catch (err) {
        throw err;
    }
};

const main = code => {
    for (let noun = 0; noun < MAX_OPS; noun++) {
        for (let verb = 0; verb < MAX_OPS; verb++) {
            try {
                const newCode = [...code];
                newCode[1] = noun;
                newCode[2] = verb;
                const result = runProgram(newCode, noun, verb, TARGET);
                return `100 * ${result.noun} + ${result.verb} = ${100 * result.noun + result.verb}`;
            }
            catch (err) {
                console.log(`${noun}, ${verb}: ${err.message}`);
            }
        }
    }
};

console.log(main(data));

