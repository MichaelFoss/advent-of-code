const main = require('../utils/main.js');

const OP_TYPES = {
    APPLY_MASK: 'mask',
    SET_MEM_VAL: 'mem',
};

/**
 * Gets the operations used in the program.
 * @param {String[]} lines
 * @returns {Array<{op:String,mask:String[],reg:Number,val:Number}>}
 */
const getOps = lines => {
    const ops = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].substring(0, 4) === 'mask') {
            const mask = lines[i]
                .substring(7)
                .split('');
            ops.push({
                type: OP_TYPES.APPLY_MASK,
                mask,
            });
        }
        else if (lines[i].substring(0, 3) === 'mem') {
            const memOp = {
                reg: Number(lines[i].substring(4, lines[i].indexOf(']'))),
                val: Number(lines[i].substring(lines[i].indexOf(' = ') + 3)),
            };
            ops.push({
                type: OP_TYPES.SET_MEM_VAL,
                ...memOp,
            });
        }
        else {
            throw new Error(`Unknown op '${lines[i]}' on line ${i}`);
        }
    }
    return ops;
};

/**
 * Converts a decimal to an array of numbers.
 * @param {Number} num
 * @param {Number} length
 * @returns {Number[]} bits
 */
const decToBin = (num, length) => {
    const bits = [];
    for (let i = 0, quotient = num; i < length; i++) {
        bits.unshift(quotient % 2);
        quotient = Math.floor(quotient / 2);
    }
    return bits;
}

/**
 * Converts an array of numbers to decimal.
 * @param {Number[]} bits
 * @returns {Number}
 */
const binToDec = bits => bits
    .reduce((val, curr, currIndex) => val + Math.pow(2, currIndex) * bits[bits.length - currIndex - 1], 0);

/**
 * Gets a masked value.
 * @param {Number} val
 * @param {String[]} mask
 * @returns {Number[]}
 */
const getMaskedValue = (val, mask) => {
    const newVal = [...decToBin(val, mask.length)];
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] !== 'X') {
            newVal[i] = Number(mask[i]);
        }
    }
    return newVal;
}

/**
 * @param {Array<{op:String,mask:String[],reg:Number,val:Number}>} ops
 * @returns {Number}
 */
const runPart1 = ops => {
    let mask = [];
    const mem = {};
    for (let i = 0; i < ops.length; i++) {
        switch (ops[i].type) {
            case OP_TYPES.APPLY_MASK:
                mask = ops[i].mask;
                break;

            case OP_TYPES.SET_MEM_VAL:
                const { reg, val } = ops[i];
                mem[reg] = getMaskedValue(val, mask);
                break;
        }
    }
    return Object
        .values(mem)
        .reduce((sum, currBits) => sum + binToDec(currBits), 0);
};

/**
 * Given an array of characters,
 * @param regs
 * @returns {number}
 */
const findMaskIndex = regs => {
    for (let regIndex = 0; regIndex < regs.length; regIndex++) {
        if (regs[regIndex].includes('X')) {
            return regIndex;
        }
    }
    return -1;
}

/**
 * Applies a V2 converter mask to a register.
 * @param {Number[]} reg
 * @param {String[]} mask
 * @returns {Array<Number|String>}
 */
const applyMask = (reg, mask) => {
    const newReg = [ ...reg ];
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
            newReg[i] = 'X';
        }
        else if (mask[i] === '1') {
            newReg[i] = 1;
        }
        else if (mask[i] !== '0') {
            throw new Error (`Unknown masked bit in getMaskedRegs on bit ${i}: ${mask[i]}`);
        }
    }
    return newReg;
}

/**
 * Given a register, generates a series of possible register values
 * given the mask, then returns all possible register values
 * as arrays of numbers.
 * @param {Number} reg
 * @param {String[]} mask
 * @returns {Array<Number[]>} A list of all possible registers
 */
const getMaskedRegs = (reg, mask) => {
    const maskedRegs = [
        applyMask([
            ...decToBin(reg, mask.length),
        ], mask),
    ];

    for (let maskIndex = findMaskIndex(maskedRegs); maskIndex !== -1; maskIndex = findMaskIndex(maskedRegs)) {
        const maskLocation = maskedRegs[maskIndex].findIndex(x => x === 'X');
        const newRegs = [
            [ ...maskedRegs[maskIndex] ],
            [ ...maskedRegs[maskIndex] ],
        ];
        newRegs[0][maskLocation] = 0;
        newRegs[1][maskLocation] = 1;
        maskedRegs.splice(maskIndex, 1, ...newRegs);
    }
    return maskedRegs;
}

/**
 * @param {Array<{op:String,mask:String[],reg:Number,val:Number}>} ops
 * @returns {Number}
 */
const runPart2 = ops => {
    let mask = [];
    const mem = {};
    for (let i = 0; i < ops.length; i++) {
        switch (ops[i].type) {
            case OP_TYPES.APPLY_MASK:
                mask = ops[i].mask;
                break;

            case OP_TYPES.SET_MEM_VAL:
                const { reg, val } = ops[i];
                const maskedRegs = getMaskedRegs(reg, mask);
                maskedRegs.forEach(maskedReg => {
                    mem[binToDec(maskedReg)] = val;
                });
                break;
        }
    }
    return Object
        .values(mem)
        .reduce((sum, curr) => sum + curr, 0);
};

/**
 * @param {String} input - The raw input from the test file
 * @returns {{part1:Number,part2:Number}}
 */
main(input => {
    const lines = input
        .split('\n');
    const ops = getOps(lines);
    return {
        part1: runPart1(ops),
        part2: runPart2(ops),
    };
});
