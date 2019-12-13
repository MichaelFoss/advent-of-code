const fs = require('fs');

const DEBUG_MODE = true;

// 5346030
// const INPUT = 1;
// const INPUT_FILE = '05.input.txt';
// Sets code to [ 1002, 4, 3, 4, 99 ]
// const INPUT_FILE = '05.test1.txt';
// Outputs [ 1 ]
// const INPUT_FILE = '05.test2.txt';
// 513116
const INPUT = 5;
const INPUT_FILE = '05.input.txt';
// The index of the test case, or -1 for all of 'em
const TEST_CASE = -1;
// const INPUT_FILE = '05.tests.part2.txt';

const data = fs.readFileSync(INPUT_FILE, 'utf-8')
    .split('\n')
    .filter(line => !!line)
    .filter(line => line[0] !== ';')
    .filter((x, i) => TEST_CASE === -1 || i === TEST_CASE)
    .map(line => line
        .split(',')
        .map(x => parseInt(x))
    );

const MAX_OPS = 1000;

const prettifiedCode = code => {
    const MAX_WIDTH = 10;
    let header = '|';
    let body = '|';
    let total = '';
    for (let i = 0; i < code.length; i++) {
        const width = Math.max(i.toString().length, code[i].toString().length);
        header += ` ${i.toString().padStart(width, ' ')} |`;
        body += ` ${code[i].toString().padStart(width, ' ')} |`;
        if ((i + 1) % MAX_WIDTH === 0 && i < code.length - 1) {
            total += '='.repeat(header.length) + '\n';
            total += `${header}\n${body}\n`;
            header = '|';
            body = '|';
        }
    }
    total += '='.repeat(header.length) + '\n';
    total += `${header}\n${body}`;
    return total;
};

const interpretOp = (code, opPointer, opCode, vals, input) => {
    console.log(`${opPointer}: ${code[opPointer]} ==> ${opCode}`);
    switch (opCode) {
        case 1:
            console.log(`code[${vals[2]}] = ${vals[0]} + ${vals[1]}`);
            break;

        case 2:
            console.log(`code[${vals[2]}] = ${vals[0]} * ${vals[1]}`);
            break;

        case 3:
            console.log(`code[${code[opPointer + 1]}] = ${input}`);
            break;

        case 4:
            console.log(`console.log(${input})`);
            break;

        case 5:
            console.log(`if (${vals[0]}) goto ${vals[1]} else goto ${opPointer + 3}`);
            break;

        case 6:
            console.log(`if (!${vals[0]}) goto ${vals[1]} else goto ${opPointer + 3}`);
            break;

        case 7:
            console.log(`code[${code[opPointer + 3]}] = ${vals[0]} < ${vals[1]} ? 1 : 0`);
            break;

        case 8:
            console.log(`code[${code[opPointer + 3]}] = ${vals[0]} === ${vals[1]} ? 1 : 0`);
            break;

        default:
            console.log(`${opCode} not defined yet`);
            break;
    }
};

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
            const vals = [];
            const paramCounts = [
                [1, 2, 4, 5, 6, 7, 8],
                [1, 2, 5, 6, 7, 8],
            ];
            paramCounts.forEach((paramCount, paramCountIndex) => {
                if (paramCount.includes(opCode)) {
                    vals.push(
                        isImmediateMode[paramCountIndex] ?
                            code[opPointer + paramCountIndex + 1] :
                            code[code[opPointer + paramCountIndex + 1]]
                    );
                }
            });
            if (DEBUG_MODE) {
                console.log(interpretOp(code, opPointer, opCode, vals, input));
                console.log(prettifiedCode(code));
                console.log(JSON.stringify(isImmediateMode));
                console.log(vals);
                console.log(JSON.stringify(output));
                console.log();
            }
            switch (opCode) {
                // 3 = 1 + 2
                case 1:
                    code[code[opPointer + 3]] = vals[0] + vals[1];
                    opPointer += 4;
                    break;

                // 3 = 1 * 2
                case 2:
                    code[code[opPointer + 3]] = vals[0] * vals[1];
                    opPointer += 4;
                    break;

                // 1 = input
                case 3:
                    code[code[opPointer + 1]] = input;
                    opPointer += 2;
                    break;

                // output input
                case 4:
                    output.push(vals[0]);
                    opPointer += 2;
                    break;

                // if 1 goto 2
                case 5:
                    if (vals[0] !== 0) {
                        opPointer = vals[1];
                    }
                    else {
                        opPointer += 3;
                    }
                    break;

                // if !1 goto 2
                case 6:
                    if (vals[0] === 0) {
                        opPointer = vals[1];
                    }
                    else {
                        opPointer += 3;
                    }
                    break;

                // 3 = 1 < 2 ? 1 : 0
                case 7:
                    code[code[opPointer + 3]] = vals[0] < vals[1] ? 1 : 0;
                    opPointer += 4;
                    break;

                // 3 = 1 === 2 ? 1 : 0
                case 8:
                    code[code[opPointer + 3]] = vals[0] === vals[1] ? 1 : 0;
                    opPointer += 4;
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
            console.log(prettifiedCode(code));
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

const main = (data, input) => {
    const results = [];
    data.forEach((datum, runNumber) => {
        try {
            results.push(runProgram(datum, input));
        }
        catch (err) {
            results.push(`[ERROR@${runNumber}]: ${err.message}`);
        }
    });
    return results;
};

console.log(main(data, INPUT));

