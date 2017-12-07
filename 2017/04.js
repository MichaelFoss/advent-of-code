// Part 1
(() => {

function isValid(s) {
  const words = s.split(' ');
  for (let i = 0; i < words.length; i++)
    for (let j = i + 1; j < words.length; j++)
      if (words[i] === words[j])
        return false;
  return true;
}

data.map(x => isValid(x)).reduce((isValid, sum) => (isValid ? 1 : 0) + sum);

})();

// Part 2
(() => {

function isAnagram(x, y) {
  return x.split('').sort().join('') === y.split('').sort().join('');
}

function isValid(s) {
  const words = s.split(' ');
  for (let i = 0; i < words.length; i++)
    for (let j = i + 1; j < words.length; j++)
      if (isAnagram(words[i], words[j]))
        return false;
  return true;
}

console.log(
  data
    .map(x => isValid(x))
    .reduce((sum, isValid) => (isValid ? 1 : 0) + sum)
);

})();
