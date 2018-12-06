(() => {

const hasXLetters = (str, targetCount) => {
	const letters = str.split('').sort();
	for (let i = 1, count = 1; i < letters.length; i++) {
		if (letters[i - 1] === letters[i]) {
			count++;
			if (
				// Found a target count
				count === targetCount && (
					// At end of string, or
					i === letters.length - 1 ||

					// Not at end of string...
					i !== letters.length - 1 &&
					// ...and next letter is different
					letters[i + 1] !== letters[i]
				)
			) {
				return true;
            }
        }
		else {
			count = 1;
        }
    }
	return false;
};

const findChecksum = data => {
	let count2 = 0;
	let count3 = 0;
	for (let i = 0; i < data.length; i++) {
		if (hasXLetters(data[i], 2)) {
			count2++;
        }
		if (hasXLetters(data[i], 3)) {
			count3++;
        }
    }
	return count2 * count3;
};

console.log(findChecksum(data));

})();

