const fs = require('fs');

const INPUT_FILE = '07.input.txt';
// const INPUT_FILE = '07.test.txt';

let data = fs.readFileSync(INPUT_FILE, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim())
  .map(line => ({
    step: line[36],
    dependency: line[5],
  }));

const getAvailableSteps = instructions => instructions
  .reduce((steps, instruction) => {
    if (!steps.includes(instruction.step)) {
      steps.push(instruction.step);
    }
    if (!steps.includes(instruction.dependency)) {
      steps.push(instruction.dependency);
    }
    return steps.sort();
  }, []);

const findNextStep = ({ instructions, availableSteps }) => {
  let stepIndex = 0;
  for (let stepIndex = 0; stepIndex < availableSteps.length; stepIndex++) {
    if (instructions.findIndex(instruction => instruction.step === availableSteps[stepIndex]) === -1) {
      return availableSteps[stepIndex];
    }
  }
  const msg = `Could not find next step. Available steps: [${availableSteps.join(',')}]`;
  throw Error(msg);
};

const removeDependency = ({ instructions, nextStep }) =>
  instructions
    .filter(instruction => instruction.dependency !== nextStep);

const main = (instructions) => {
  const steps = [];
  const availableSteps = getAvailableSteps(instructions);
  while (availableSteps.length > 0) {
    // Find the next step
    const nextStep = findNextStep({ instructions, availableSteps });
    // Remove all dependencies
    instructions = removeDependency({ instructions, nextStep });
    // Remove it from the available steps
    availableSteps.splice(availableSteps.findIndex(step => step === nextStep), 1);
    // Add it to the total steps
    steps.push(nextStep);
  }
  return steps.join('');
}

console.log(main(data));

