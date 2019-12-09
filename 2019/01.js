const fs = require('fs');

// 3226488 / 4836845
const INPUT_FILE = '01.input.txt';
// Simple: 2 + 2 + 654 + 33583 = 34241
// Complex: 2 + 2 + 966 + 50346 = 51316
// const INPUT_FILE = '01.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
    .trim()
    .split('\n')
    .map(line => parseInt(line.trim()));

const main = numbers => {
    const answer = [];

    const getComplexFuel = number => {
        let fuel = 0;
        while (number > 0) {
            number = Math.floor(number / 3) - 2;
            if (number > 0) {
                fuel += number;
            }
        };
        return fuel;
    };

    // Simple fuel calculation
    answer.push(numbers
        .map(number => Math.floor(number / 3) - 2)
        .reduce((sum, curr) => sum + curr, 0)
    );

    // Complex fuel calculation
    answer.push(numbers
        .map(number => getComplexFuel(number))
        .reduce((sum, curr) => sum + curr, 0)
    );

    return answer;
};

console.log(main(data));

