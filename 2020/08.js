const main = require('../utils/main.js');

const execute = (regs, instructions) => {
    const nextRegs = {
        ...regs,
    };
    switch (instructions[regs.ins].op) {
        case 'acc':
            nextRegs.acc += instructions[regs.ins].arg;
            nextRegs.ins++;
            break;

        case 'nop':
            nextRegs.ins++;
            break;

        case 'jmp':
            nextRegs.ins += instructions[regs.ins].arg;
            break;

        default:
            throw new Error(`Unknown instruction ${instructions[regs.ins].op} in execute.`);
    }
    return nextRegs;
}

const runPart1 = instructions => {
    let regs = {
        acc: 0, // Accumulator
        ins: 0, // Instruction index
    };
    const usedInstructions = [];

    do {
        usedInstructions.push(regs.ins);
        regs = execute(regs, instructions);
    } while (!usedInstructions.includes(regs.ins) && regs.ins < instructions.length);

    return {
        accumulator: regs.acc,
        isInfiniteLoop: regs.ins < instructions.length || usedInstructions.includes(regs.ins),
    };
};

const runPart2 = instructions => {
    let properAccumulator = undefined;
    for (let i = 0; i < instructions.length && properAccumulator === undefined; i++) {
        // Clone the instructions
        const newInstructions = [
            ...instructions,
        ]
            .map(instruction => ({
                ...instruction,
            }));

        // Swap a nop/jmp
        switch (newInstructions[i].op) {
            case 'nop':
                newInstructions[i].op = 'jmp';
                break;
            case 'jmp':
                newInstructions[i].op = 'nop';
                break;
            case 'acc':
                // Can't swap; go next
                continue;
            default:
                throw new Error(`Unknown instruction ${instructions[regs.ins].op} in runPart2.`);
        }

        // Give it a whirl
        const results = runPart1(newInstructions);
        if (!results.isInfiniteLoop) {
            properAccumulator = results.accumulator;
        }
    }
    return properAccumulator;
};

main(input => {
    const instructions = input
        .split('\n')
        .map(x => x
            .trim()
            .split(' ')
        )
        .map(x => ({
            op: x[0],
            arg: Number(x[1]),
        }));
    return {
        part1: runPart1(instructions),
        part2: runPart2(instructions),
    };
});
