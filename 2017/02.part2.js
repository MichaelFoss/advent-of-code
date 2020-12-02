const input = require(`./02.${process.argv[2]}.js`);

const data = input
  .split('\n')
  .map(x => x.trim())
  .map(line => line
    .split('\t')
    .map(x => Number(x.trim()))
  );

const divideMaxByMin = nums => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const min = nums[i] > nums[j] ? nums[j] : nums[i];
      const max = nums[i] === min ? nums[j] : nums[i];
      if (max % min === 0) {
        return max / min;
      }
    }
  }
};

const checksum = data
  .reduce((range, nums) => {
    const result = divideMaxByMin(nums);
    range.push(result);
    return range;
  }, [])
  .reduce((sum, curr) => sum + curr);

console.log(checksum);

