const fs = require('fs');

const DEBUG_MODE = true;

// 5346030
const INPUT_FILE = '05.input.txt';
// Sets code to [ 1002, 4, 3, 4, 99 ]
// const INPUT_FILE = '05.test1.txt';
// Outputs [ 1 ]
// const INPUT_FILE = '05.test2.txt';
const INPUT = 1;

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
    .split(',')
    .map(x => parseInt(x));

const MAX_OPS = 1000;

const runProgram = (code, input) => {
    let opPointer = 0;
    let ops = 0;
    let output = [];

    try {
        while (code[opPointer] !== 99 && ops < MAX_OPS) {
            const opCode = code[opPointer] % 100;
            const isImmediateMode = [
                Math.floor(code[opPointer] / 100) % 10 === 1,
                Math.floor(code[opPointer] / 1000) % 10 === 1,
                Math.floor(code[opPointer] / 10000) % 10 === 1,
            ];
            if (DEBUG_MODE) {
                console.log(`${opPointer}: ${opCode}`);
                console.log(JSON.stringify(code));
                console.log(JSON.stringify(isImmediateMode));
                console.log(JSON.stringify(output));
                console.log();
            }
            switch (opCode) {
                case 1:
                    code[code[opPointer + 3]] =
                        (isImmediateMode[0] ? code[opPointer + 1] : code[code[opPointer + 1]]) +
                        (isImmediateMode[1] ? code[opPointer + 2] : code[code[opPointer + 2]]);
                    opPointer += 4;
                    break;

                case 2:
                    code[code[opPointer + 3]] =
                        (isImmediateMode[0] ? code[opPointer + 1] : code[code[opPointer + 1]]) *
                        (isImmediateMode[1] ? code[opPointer + 2] : code[code[opPointer + 2]]);
                    opPointer += 4;
                    break;

                case 3:
                    code[code[opPointer + 1]] = input;
                    opPointer += 2;
                    break;

                case 4:
                    output.push(isImmediateMode[0] ? code[opPointer + 1] : code[code[opPointer + 1]]);
                    opPointer += 2;
                    break;

                default:
                    const errorMessage = `Unknown opCode '${code[opPointer]}' at '${opPointer}'.
code: ${JSON.stringify(code)}`;
                    throw new Error(errorMessage);
            }
            ops++;
        }

        if (DEBUG_MODE) {
            console.log(`*** Total Ops: ${ops} ***`);
            console.log(JSON.stringify(code));
        }

        if (ops === MAX_OPS) {
            throw new Error(`Operations exceeded MAX_OPS of ${MAX_OPS}.`);
        }
        else {
            return output;
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

console.log(runProgram(data, INPUT));

