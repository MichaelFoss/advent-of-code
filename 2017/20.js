const FILENAME = './20.input.txt';
// const FILENAME = './20.test.part1.txt';
// const FILENAME = './20.test.part2.txt';

const MAX_LOOPS = 1e5;
const USE_COLLISION = true;
const DEBUG_EVERY = 1e3;

const particles = require('fs').readFileSync(FILENAME, 'utf8')
  .trim()
  .split('\n')
  .map((line, key) => line
    .split(', ')
    .map(component => {
      const parts = component.split('=');
      parts[1] = parts[1].substr(1, parts[1].length - 2);
      parts[1] = parts[1]
        .split(',')
        .map(x => parseInt(x.trim()));
      return parts;
    })
    .reduce((components, component) => {
      components[component[0]] = component[1];
      return components;
    }, { key })
  );

function move(particle) {
  // Yes, the order is to do all v, then all p,
  // but since the axes are independent of one another,
  // we can take this shortcut
  for (let i = 0; i <= 2; i++) {
    particle.v[i] += particle.a[i];
    particle.p[i] += particle.v[i];
  }
}

function getManhattanDistance(particle) {
  return particle.p.reduce((sum, dist) => sum + Math.abs(dist), 0);
}

function isInSameSpace(a, b) {
  return (
    a.p[0] === b.p[0] &&
    a.p[1] === b.p[1] &&
    a.p[2] === b.p[2]
  );
}

function destroyParticles() {
  for (let i = 0; i < particles.length; i++) {
    // Look for colliding particles
    const colliders = [];
    for (let j = i + 1; j < particles.length; j++) {
      if (isInSameSpace(particles[i], particles[j])) {
        colliders.push(j);
      }
    }

    // If particles occupy the same space, blow them up
    if (colliders.length > 0) {
      while (colliders.length > 0) {
        // Destroy each collider
        const particleIndex = colliders.pop();  
        particles.splice(particleIndex, 1);
      }
      // Don't forget to destroy the original particle
      particles.splice(i, 1);
      i--;
    }
  }
}

let i = 0;
while (i <= MAX_LOOPS) {
  // console.log(particles);
  i++;
  particles.map(particle => move(particle));
  if (USE_COLLISION) {
    destroyParticles();
    if (i % DEBUG_EVERY === 0) {
      console.log(`Particles left: ${particles.length}`);
    }
  }
}

let closestParticleNum = 0;
let minDist = getManhattanDistance(particles[0]);
particles.forEach((particle, particleNum) => {
  const dist = getManhattanDistance(particle);
  if (dist < minDist) {
    minDist = dist;
    closestParticleNum = particleNum;
  }
});
console.log(`Closest particle: ${closestParticleNum} / ${particles.length - 1} @ ${minDist} ${JSON.stringify(particles[closestParticleNum])}`);

