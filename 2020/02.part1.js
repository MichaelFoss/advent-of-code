(() => {
    const items = data
        .split('\n')
        .map(x => x.trim())
        .map(x => {
            const parts = x
                .split(': ')
                .map(x => x.trim());
            const min = Number(parts[0].split('-')[0]);
            const max = Number(parts[0].split(' ')[0].substr(parts[0].indexOf('-') + 1));
            const letter = parts[0].substr(parts[0].length - 1);
            return { min, max, letter, password: parts[1] };
        });
    let sum = 0;
    items.forEach(({ min, max, letter, password }) => {
        let count = 0;
        for (let i = 0; i < password.length; i++) {
            if (password[i] === letter) {
                count++;
            }
        }
        if (count >= min && count <= max) {
            sum++;
        }
    });
    console.log(sum);
})();

