import main from '../utils/main.js';

const generateEngine = engineSchematic => {
    const engine = engineSchematic
        .split('\n')
        .map(engineSchematicLine => engineSchematicLine.split(''));
    return engine;
}

/**
 * @param {string} engineSchematicLine
 * @returns {Array<{ index: number, length: number, number: number }>}
 */
const getPartNumberDataFromLine = engineSchematicLine => {
    const isNumber = char => /^[0-9]$/.test(char);
    const isActivelyBuildingPartNumber = partNumber => partNumber.length > 0;

    const partNumberData = [];
    let currentPartNumber = '';
    for (let i = 0; i < engineSchematicLine.length; i++) {
        const char = engineSchematicLine[i];
        if (isNumber(char)) {
            currentPartNumber += char;
        } else {
            if (isActivelyBuildingPartNumber(currentPartNumber)) {
                partNumberData.push({
                    index: i - currentPartNumber.length,
                    length: currentPartNumber.length,
                    number: Number.parseInt(currentPartNumber),
                });
                currentPartNumber = '';
            }
        }
    }
    // This handles the case where the number goes right up
    // until the end of the line
    if (isActivelyBuildingPartNumber(currentPartNumber)) {
        partNumberData.push({
            index: engineSchematicLine.length - currentPartNumber.length,
            length: currentPartNumber.length,
            number: Number.parseInt(currentPartNumber),
        });
    }
    return partNumberData;
}

/**
 * @param {Array<Array<string>>} engine
 * @returns {Array<{ lineIndex: number, index: number, length: number, number: number }>}
 */
const getPartNumberData = engine => {
    const partNumberData = [];
    for (let lineIndex = 0; lineIndex < engine.length; lineIndex++) {
        const engineLine = engine[lineIndex];
        const partNumberDataForLine = getPartNumberDataFromLine(engineLine)
            .map(partNumberDatum => ({
                lineIndex,
                ...partNumberDatum,
            }));
        partNumberData.push(partNumberDataForLine);
    }
    return partNumberData.flat();
};

/**
 * Checks if a non-digit, non-period symbol is adjacent
 * to the number in the engine.
 * @param {Array<Array<string>>} engine
 * @param {{ lineIndex: number, index: number, length: number, number: number }} partNumberData
 * @returns {boolean}
 */
const isValidPartNumber = (engine, partNumberDatum) => {
    const isSymbol = char => /^[^\d\.]$/.test(char);

    const {
        lineIndex,
        index,
        length,
    } = partNumberDatum;
    const lastIndex = engine[0] - 1;
    const lastEngineIndex = engine.length - 1;

    /**
     * At a high level, check the areas around the number;
     * if at any point we find a symbol, stop checking
     * and return true.
     */

    // Check above
    if (lineIndex !== 0) {
        // Diagonal left
        if (index !== 0 && isSymbol(engine[lineIndex - 1][index - 1])) {
            return true;
        }
        // Diagonal right
        if (index !== lastIndex && isSymbol(engine[lineIndex - 1][index + length])) {
            return true;
        }
        // Check each character above
        for (let i = index; i < index + length; i++) {
            if (isSymbol(engine[lineIndex - 1][i])) {
                return true;
            }
        }
    }
    // Check left
    if (index !== 0 && isSymbol(engine[lineIndex][index - 1])) {
        return true;
    }
    // Check right
    if (index !== lastIndex && isSymbol(engine[lineIndex][index + length])) {
        return true;
    }
    // Check below
    if (lineIndex !== lastEngineIndex) {
        // Diagonal left
        if (index !== 0 && isSymbol(engine[lineIndex + 1][index - 1])) {
            return true;
        }
        // Diagonal right
        if (index !== lastIndex && isSymbol(engine[lineIndex + 1][index + length])) {
            return true;
        }
        // Check each character below
        for (let i = index; i < index + length; i++) {
            if (isSymbol(engine[lineIndex + 1][i])) {
                return true;
            }
        }
    }

    // Not a part number
    return false;
}

/**
 * @param {Array<Array<string>>} engine
 * @param {Array<{ lineIndex: number, index: number, length: number, number: number }>} partNumberData
 * @returns {Array<number>}
 */
const getPartNumbersFromPartNumberData = (engine, partNumberData) => {
    const partNumbers = partNumberData
        .filter(partNumberDatum => isValidPartNumber(engine, partNumberDatum))
        .map(partNumberDatum => partNumberDatum.number);
    return partNumbers;
};

main(input => {
    const engine = generateEngine(input);
    const partNumberData = getPartNumberData(engine);
    const partNumbers = getPartNumbersFromPartNumberData(engine, partNumberData);
    const sumOfPartNumbers = partNumbers.reduce((a, b) => a + b);
    return sumOfPartNumbers;
});
