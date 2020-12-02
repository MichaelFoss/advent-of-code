(() => {
  data += data[0];
  let prev = '';
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === prev) {
      sum += Number(prev);
    }
    prev = data[i];
  }
  console.log(sum);
})();

(() => {
  let sum = 0;
  for (let i = 0; i < data.length / 2; i++) {
    if (data[i] === data[i + data.length / 2]) {
      sum += Number(data[i]) * 2;
    }
  }
  console.log(sum);
})();

