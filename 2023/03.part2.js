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
 * to the number in the engine. Also looks for gears (asterisks).
 * @param {Array<Array<string>>} engine
 * @param {{ lineIndex: number, index: number, length: number, number: number }} partNumberData
 * @returns {{ isValid: boolean, gears: Array<{ lineIndex: number, index: number }>}
 */
const getPartNumberMetaData = (engine, partNumberDatum) => {
    const isSymbol = char => /^[^\d\.]$/.test(char);
    const isGear = char => char === '*';
    let isValid = false;
    let gears = [];

    const {
        lineIndex,
        index,
        length,
        number,
    } = partNumberDatum;
    const lastIndex = engine[0] - 1;
    const lastEngineIndex = engine.length - 1;

    /**
     * At a high level, check the areas around the number;
     * if at any point we find a symbol, stop checking
     * and flag it as valid.
     * 
     * While we check, also look for gears and track them for later.
     */

    // Check above
    if (lineIndex !== 0) {
        // Diagonal left
        if (index !== 0) {
            const char = engine[lineIndex - 1][index - 1];
            if (isSymbol(char)) {
                isValid = true;
                if (isGear(char)) {
                    gears.push({ lineIndex: lineIndex - 1, index: index - 1, partNumberData: { ...partNumberDatum} });
                }
            }
        }
        // Diagonal right
        if (index !== lastIndex) {
            const char = engine[lineIndex - 1][index + length];
            if (isSymbol(char)) {
                isValid = true;
                if (isGear(char)) {
                    gears.push({ lineIndex: lineIndex - 1, index: index + length, partNumberData: { ...partNumberDatum} });
                }
            }
        }
        // Check each character above
        for (let i = index; i < index + length; i++) {
            const char = engine[lineIndex - 1][i];
            if (isSymbol(char)) {
                isValid = true;
                if (isGear(char)) {
                    gears.push({ lineIndex: lineIndex - 1, index: i, partNumberData: { ...partNumberDatum} });
                }
            }
        }
    }
    // Check left
    if (index !== 0) {
        const char = engine[lineIndex][index - 1];
        if (isSymbol(char)) {
            isValid = true;
            if (isGear(char)) {
                gears.push({ lineIndex: lineIndex, index: index - 1, partNumberData: { ...partNumberDatum} });
            }
        }
    }
    // Check right
    if (index !== lastIndex) {
        const char = engine[lineIndex][index + length];
        if (isSymbol(char)) {
            isValid = true;
            if (isGear(char)) {
                gears.push({ lineIndex: lineIndex, index: index + length, partNumberData: { ...partNumberDatum} });
            }
        }
    }
    // Check below
    if (lineIndex !== lastEngineIndex) {
        // Diagonal left
        if (index !== 0) {
            const char = engine[lineIndex + 1][index - 1];
            if (isSymbol(char)) {
                isValid = true;
                if (isGear(char)) {
                    gears.push({ lineIndex: lineIndex + 1, index: index - 1, partNumberData: { ...partNumberDatum} });
                }
            }
        }
        // Diagonal right
        if (index !== lastIndex) {
            const char = engine[lineIndex + 1][index + length];
            if (isSymbol(char)) {
                isValid = true;
                if (isGear(char)) {
                    gears.push({ lineIndex: lineIndex + 1, index: index + length, partNumberData: { ...partNumberDatum} });
                }
            }
        }
        // Check each character below
        for (let i = index; i < index + length; i++) {
            const char = engine[lineIndex + 1][i];
            if (isSymbol(char)) {
                isValid = true;
                if (isGear(char)) {
                    gears.push({ lineIndex: lineIndex + 1, index: i, partNumberData: { ...partNumberDatum} });
                }
            }
        }
    }

    return {
        isValid,
        gears,
    };
}

/**
 * @param {Array<{ lineIndex: number, index: number, length: number, number: number }>} validPartNumberData
 * @param {{ lineIndex: number, index: number }} gear
 * @returns {Array<number>}
 */
const getAdjacentPartNumbersToGear = (validPartNumberData, gear) => {
    
}

/**
 * @param {Array<{ lineIndex: number, index: number, length: number, number: number }>} validPartNumberData
 * @param {Array<{ lineIndex: number, index: number }>} gears
 * @returns {Array<number>}
 */
const getGearRatios = (validPartNumberData, gears) => {
    const gearRatios = [];
    for (const gear of gears) {
        const adjacentPartNumbers = gear.partNumbers.map(data => data.number);
        if (adjacentPartNumbers.length === 2) {
            gearRatios.push(adjacentPartNumbers[0] * adjacentPartNumbers[1]);
        }
    }
    return gearRatios;
};

/**
 * @param {Array<Array<string>>} engine
 * @param {Array<{ lineIndex: number, index: number, length: number, number: number }>} partNumberData
 * @returns {{ partNumbers: Array<number>, gearRatios: Array<number> }}
 */
const getPartNumbersAndGearsFromPartNumberData = (engine, partNumberData) => {
    const {} = partNumberData
        .map(partNumberDatum => getPartNumberMetaData(engine, partNumberDatum));
    const validPartNumberData = [];
    // Yeah, this should probably be a Map of Sets or something,
    // but this entire project should be TypeScript instead of JavaScript.
    // I'm lazy. This is my time off. Leave me alone.
    const gearsAndAdjacentPartNumbers = {};
    for (let i = 0; i < partNumberData.length; i++) {
        const partNumberDatum = partNumberData[i];
        const { gears, isValid } = getPartNumberMetaData(engine, partNumberDatum);
        if (isValid) {
            validPartNumberData.push(partNumberDatum);
        }
        for (const gear of gears) {
            if (gearsAndAdjacentPartNumbers[`${gear.lineIndex},${gear.index}`] === undefined) {
                gearsAndAdjacentPartNumbers[`${gear.lineIndex},${gear.index}`] = [{ ...gear.partNumberData }];
            } else {
                gearsAndAdjacentPartNumbers[`${gear.lineIndex},${gear.index}`].push({ ...gear.partNumberData });
            }
        }
    }
    const gears = [];
    for (const gearString of Object.keys(gearsAndAdjacentPartNumbers)) {
        const [lineIndex, index] = gearString.split(',').map(numberString => Number.parseInt(numberString));
        const partNumberData = gearsAndAdjacentPartNumbers[gearString];
        const partNumbers = partNumberData
            .map(({ lineIndex, index, number }) => `${lineIndex},${index},${number}`)
            .reduce((partNumberDataStrs, partNumberDataStr) => {
                const newArr = [...partNumberDataStrs];
                if (!newArr.includes(partNumberDataStr)) {
                    newArr.push(partNumberDataStr);
                }
                return newArr;
            }, [])
            .map(partNumberDataStrs => {
                const [ lineIndex, index, number ] = partNumberDataStrs.split(',');
                return { lineIndex, index, number };
            });
        const gear = {
            lineIndex,
            index,
            partNumbers,
        };
        gears.push(gear);
    }

    const gearRatios = getGearRatios(validPartNumberData, gears);
    const partNumbers = validPartNumberData
        .map(partNumberDatum => partNumberDatum.number);
    return {
        partNumbers,
        gearRatios,
    };
};

main(input => {
    const engine = generateEngine(input);
    const partNumberData = getPartNumberData(engine);
    const { gearRatios } = getPartNumbersAndGearsFromPartNumberData(engine, partNumberData);
    const gearRatiosSum = gearRatios.reduce((a, b) => a + b);
    return gearRatiosSum;
});
