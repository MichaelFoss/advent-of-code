(() => {

const data = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`.split('	').map(x => parseInt(x));
const configs = [];

function getLargestIndex(config) {
  let largestIndex = 0;
  for (let val = config[0], i = 1; i < config.length; i++) {
    if (config[i] > val) {
      val = config[i];
      largestIndex = i;
    }
  }
  return largestIndex;
}

function malloc(data) {
  const largestIndex = getLargestIndex(data);
  let currentIndex = (largestIndex === data.length - 1 ? 0 : largestIndex + 1);
  let val = data[largestIndex];
  data[largestIndex] = 0;
  while (val > 0) {
    data[currentIndex]++;
    val--;
    currentIndex++;
    if (currentIndex === data.length) {
      currentIndex = 0;
    }
  }
}

let count = 0;
let dataStr = data.join(',');

// Look for a duplicate occurence of a config
do {
  configs.push(dataStr);
  malloc(data);
  count++;
  dataStr = data.join(',');
} while (configs.find(config => config === dataStr) === undefined);

console.log(`Iterated ${count} times to re-find ${dataStr}.`);

// Look for the next occurence of the same config
const targetConfigStr = dataStr;
// Remove the first occurence
configs.splice(configs.findIndex(config => config === targetConfigStr), 1);

count = 0;
while (configs.find(config => config === dataStr) === undefined) {
  malloc(data);
  count++;
  configs.push(data.join(','));
}

console.log(`Iterated ${count} times to re-re-find ${targetConfigStr}.`);

})();
