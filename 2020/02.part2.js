(() => {
    const items = data
        .split('\n')
        .map(x => x.trim())
        .map(x => {
            const parts = x
                .split(': ')
                .map(x => x.trim());
            const slot1 = Number(parts[0].split('-')[0]);
            const slot2 = Number(parts[0].split(' ')[0].substr(parts[0].indexOf('-') + 1));
            const letter = parts[0].substr(parts[0].length - 1);
            return { slot1, slot2, letter, password: parts[1] };
        });
    let sum = 0;
    items.forEach(({ slot1, slot2, letter, password }) => {
        if ((password[slot1 - 1] === letter || password[slot2 - 1] === letter) && password[slot1 - 1] !== password[slot2 - 1]) {
            sum++;
        }
    });
    console.log(sum);
})();

