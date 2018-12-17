const fs = require('fs');

const INPUT_FILE = '04.input.txt';
// const INPUT_FILE = '04.test.txt';

const ONE_MINUTE = 1 * 60 * 1000;

const customSort = (a, b) => {
  const [ s1, s2 ] = [ a.substring(1, 17), b.substring(1, 17) ];
  return (
    (s1 == s2)
    ? 0
    : (
      (s1 > s2)
      ? 1
      : -1
    )
  );
}

class Record {
  constructor(s) {
    this.date = s.substring(1, 17);
    switch (s.substr(19, 1)) {
      case 'G':
        this.action = 'Guard';
        this.id = s.substr(26, s.length - 39);
        break;
      case 'f':
        this.action = 'Start';
        break;
      case 'w':
        this.action = 'Stop';
        break;
      default:
        throw new Error(`Unparsable line ${s}`);
    }
  }
}

class Guard {
  constructor(id) {
    this.id = id;
    this.naps = [];
    this.totalNapTime = 0;
    this.minutes = new Array(60).fill(0);
  }

  addNap(startTime, stopTime) {
    let start = new Date(startTime); 
    const stop = new Date(stopTime);
    this.totalNapTime += (stop - start) / 1000 / 60;
    while (start < stop) {
      this.minutes[start.getMinutes()]++;
      start = new Date(start.getTime() + ONE_MINUTE);
    }
  }

  get popularSlumberMinute() {
    let maxMinute = 0;
    for (let currentMinute = 1; currentMinute < 60; currentMinute++) {
      if (this.minutes[currentMinute] > this.minutes[maxMinute]) {
        maxMinute = currentMinute;
      }
    }
    return maxMinute;
  }

  static get _minutesHeader() {
    return (
      [
        ' ' + [
          ...(new Array(10).fill(0)),
          ...(new Array(10).fill(1)),
          ...(new Array(10).fill(2)),
          ...(new Array(10).fill(3)),
          ...(new Array(10).fill(4)),
          ...(new Array(10).fill(5)),
        ].join(' '),
        ' ' + [
          ...(Array.from(new Array(10), (_, x) => x)),
          ...(Array.from(new Array(10), (_, x) => x)),
          ...(Array.from(new Array(10), (_, x) => x)),
          ...(Array.from(new Array(10), (_, x) => x)),
          ...(Array.from(new Array(10), (_, x) => x)),
          ...(Array.from(new Array(10), (_, x) => x)),
        ].join(' '),
        '-'.repeat(60 * 2),
      ].join('\n')
    );
  }

  toString() {
    return `Guard #${this.id}
${Guard._minutesHeader}
${this.minutes.map(x => x < 10 ? ' ' + x : x).join('')}
`;
  }
}

const createGuards = records => {
  let currentGuard;
  const guards = [];

  for (let i = 0; i < records.length; i++) {
    switch (records[i].action) {
      case 'Guard':
        currentGuard = guards.find(guard => guard.id === records[i].id);
        if (!currentGuard) {
          currentGuard = new Guard(records[i].id);
          guards.push(currentGuard);
        }
        break;

      case 'Start':
        try {
          currentGuard.addNap(records[i].date, records[i + 1].date);
          i++;
        }
        catch (err) {
          throw new Error(`Could not add nap for guard #${currentGuard.id} (record #${i})`);
        }
        break;

      case 'Stop':
        throw new Error(`Found unhandled Stop action (record #${i})`);
        break;
    }
  }

  guards.sort((guardA, guardB) => guardA.id < guardB.id);

  return guards;
}

const records = fs.readFileSync(INPUT_FILE, 'utf-8')
  .trim()
  .split('\n')
  .map(s => s.trim())
  .sort(customSort)
  .map(s => new Record(s));

const getConsistentlySleepyGuard = guards => {
  let currentGuard = guards[0];
  let currentGuardPopularSlumberMinute = guards[0].popularSlumberMinute;
  for (i = 1; i < guards.length; i++) {
    if (currentGuard.minutes[currentGuard.popularSlumberMinute] < guards[i].minutes[guards[i].popularSlumberMinute]) {
      currentGuard = guards[i];
    }
  }
  return currentGuard;
};

const main = () => {
  const guards = createGuards(records);
  // Use filter for testing purposes only
  // const consistentlySleepyGuard = getConsistentlySleepyGuard(guards.filter((x, i) => i < 2));
  const consistentlySleepyGuard = getConsistentlySleepyGuard(guards);
  const id = consistentlySleepyGuard.id;
  const minute = consistentlySleepyGuard.popularSlumberMinute;
  const minuteCount = consistentlySleepyGuard.minutes[minute];
  console.log(`ID ${id} x Minute ${minute} (Minute Count ${minuteCount}) = ${id * minute}`);
}

main();

