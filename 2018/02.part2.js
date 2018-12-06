(() => {

const same = (str1, str2) => {
	str3 = '';
	for (let i = 0; i < str1.length; i++) {
		if (str1[i] === str2[i]) {
			str3 += str1[i];
        }
    }
	return str3;
};

const findClose = data => {
	for (let i = 0; i < data.length; i++) {
		for (let j = 1; j < data.length; j++) {
			const similar = same(data[i], data[j]);
			if (similar.length === data[i].length - 1) {
				return similar;
            }
        }
    }
	return '?';
};

console.log(findClose(data));

})();

