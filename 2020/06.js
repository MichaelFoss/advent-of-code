const main = require('../utils/main.js');

const countUniqueGroupAnswersFromAnyone = groupsAnswers => groupsAnswers
    .map(groupAnswer => groupAnswer.length)
    .reduce((sum, curr) => sum + curr, 0);

const countUniqueGroupAnswersFromEveryone = groups =>
    groups
        .map(group => {
            const groupAnswers = {};
            const people = group.split('\n');
            people.forEach(person => {
                person
                    .split('')
                    .forEach(answer => {
                        groupAnswers[answer] = groupAnswers[answer] ? groupAnswers[answer] + 1 : 1;
                    });
            });
            return Object.keys(groupAnswers)
                .filter(answer => groupAnswers[answer] === people.length)
                .length;
        })
        .reduce((sum, curr) => sum + curr, 0);

main(input => {
    const groups = input.split('\n\n').map(x => x.trim());
    const groupsAnswers = groups.map(groupAnswers => [
        ...(new Set(groupAnswers
            .replace(/\n/g, '')
            .split('')
        ))
    ]);
    const people = groups.map(x => x.split('\n'));
    const answers = people.map(group => group.map(person => person.split('')));
    return {
        part1: countUniqueGroupAnswersFromAnyone(groupsAnswers),
        part2: countUniqueGroupAnswersFromEveryone(groups),
    };
});
