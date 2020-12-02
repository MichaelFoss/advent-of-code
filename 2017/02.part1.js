const input = require(`./02.${process.argv[2]}.js`);

const data = input
  .split('\n')
  .map(x => x.trim())
  .map(line => line
    .split('\t')
    .map(x => Number(x.trim()))
  );

const checksum = data
  .reduce((range, nums) => {
    let min = nums[0];
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (min > nums[i]) {
        min = nums[i];
      }
      if (max < nums[i]) {
        max = nums[i];
      }
    }
    range.push(max - min);
    return range;
  }, [])
  .reduce((sum, curr) => sum + curr);

console.log(checksum);

