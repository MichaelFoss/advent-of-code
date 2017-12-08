(() => {

const input = window.localStorage.data;
/*
const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;
*/

const data = input.split('\n').map(x => {
  parts = x.split(' ');
  return {
    register: parts[0],
    value: (parts[1] === 'dec' ? -1 : 1) * parseInt(parts[2]),
    registerToCompare: parts[4],
    comparison: parts[5],
    compareValue: parts[6]
  };
});

const registers = {};
let maxValue = 0;

for (let i = 0; i < data.length; i++) {
  // Add registers if needed
  if (registers[data[i].registerToCompare] === undefined) {
    registers[data[i].registerToCompare] = 0;
  }
  if (registers[data[i].register] === undefined) {
    registers[data[i].register] = 0;
  }

  // Check for need to execute instruction
  if (eval(`${registers[data[i].registerToCompare]} ${data[i].comparison} ${data[i].compareValue}`)) {
    registers[data[i].register] += data[i].value;
    maxValue = Math.max(registers[data[i].register], maxValue);
  }
}

console.log(registers);
console.log('Max register value: ' + Object.keys(registers).reduce((maxRegisterValue, register) => Math.max(maxRegisterValue, registers[register]), 0));
console.log('Max value at any time: ' + maxValue);

})();
