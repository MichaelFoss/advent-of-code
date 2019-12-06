const fs = require('fs');

const MAX_GENERATIONS = 20;

// const INPUT_FILE = '12.input.json';
const INPUT_FILE = '12.test.json';

let data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8').trim());

class Plant {
  nextGeneration(growers, plantTwoLeft, plantLeft, plantRight, plantTwoRight) {
    let s = '';
    s += `${plantTwoLeft}${plantLeft}${this.plantStatus}${plantRight}${plantTwoRight}`;
    return growers.includes(s) ? '#' : '.';
  }

  constructor(id, plantStatus) {
    this.id = id;
    this.plantStatus = plantStatus;
  }
}

const grow = ({ plants, growers }) => {
  const firstId = plants[0].id;
  const lastId = plants[plants.length - 1].id;
  const oldPlants = plants.map(plant => new Plant(plant.id, plant.plantStatus));

  // Expand plant array
  oldPlants.unshift(new Plant(firstId - 1, '.'));
  oldPlants.unshift(new Plant(firstId - 2, '.'));
  oldPlants.push(new Plant(lastId + 1, '.'));
  oldPlants.push(new Plant(lastId + 2, '.'));

  const newPlants = oldPlants.map(plant => new Plant(plant.id, plant.plantStatus));

  for (let i = 2; i < newPlants.length - 3; i++) {
    newPlants[i].plantStatus = newPlants[i].nextGeneration(
      growers,
      oldPlants[i - 2].plantStatus,
      oldPlants[i - 1].plantStatus,
      oldPlants[i + 1].plantStatus,
      oldPlants[i + 2].plantStatus
    );
  }

  return newPlants;
};

const printPlants = (plants, generation) => {
  let lines = [];
  let line1 = ' '.repeat(generation * 2);
  let line2 = ' '.repeat(generation * 2);
  for (let i = 0; i < plants.length - generation * 2; i++) {
    line2 += (i % 10).toString();
    if (i % 10 === 0) {
      line1 += (Math.floor(i / 10) % 10).toString();
    }
    else {
      line1 += ' ';
    }
  }
  lines.push(`[${generation.toString().padStart(2, '0')}]`);
  lines.push(line1);
  lines.push(line2);
  lines.push(
    plants.reduce((s, plant) => s + plant.plantStatus, '')
  );
  lines.push('\n');
  
  // Only show the grid as it appears on the example
  let s = generation.toString().padStart(2, ' ') + ': ';
  for (let i = -3; i < 35; i++) {
    if (generation === 0 && i < 0) {
      s += '.';
      continue;
    }
    else if (generation === 1 && i < -2) {
      s += '.';
      continue;
    }
    const plant = plants.find(plant => plant.id === i);
    if (plant) {
      s += plant.plantStatus;
    }
  }
  s = s.padEnd(43, '.');
  return s;

  return lines.join('\n');
}

const buildGreenhouse = initialState => {
  const plants = [];
  for (let i = 0; i < initialState.length; i++) {
    plants.push(new Plant(i, initialState[i]));
  }
  return plants;
}

const sumPlants = plants => plants
  .filter(plant => plant.plantStatus === '#')
  .map(plant => plant.id)
  .reduce((sum, id) => sum + id, 0)
;

const main = ({ initialState, growers }) => {
  let plants = buildGreenhouse(initialState);
  console.log(printPlants(plants, 0));
  // Apply rules
  for (let gen = 1; gen <= MAX_GENERATIONS; gen++) {
    plants = grow({ plants, growers });
    console.log(printPlants(plants, gen));
  }

  const sum = sumPlants(plants);

  console.log(plants.filter(plant => plant.plantStatus === '#').map(plant => plant.id));
  return sum;
}

console.log(main(data));

