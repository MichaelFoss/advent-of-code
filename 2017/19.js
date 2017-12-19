// Part 1

function part1() {
  const FILENAME = './19.input.txt';
  //const FILENAME = './19.test.txt';
  const maze = require('fs').readFileSync(FILENAME, 'utf8')
    .split('\n')
    .map(x => x.split(''));
  const WIDTH = maze[0].length;  
  const HEIGHT = maze.length;

  function isAtEnd() {
    switch (dir) {
      case 'n': return y < 0 || maze[y][x] === ' ';
      case 's': return y >= HEIGHT || maze[y][x] === ' ';
      case 'w': return x < 0 || maze[y][x] === ' ';
      case 'e': return x >= WIDTH || maze[y][x] === ' ';
    }
  }

  function changeDirection() {
    if (dir === 'n' || dir === 's') {
      if (x >= 0 && maze[y][x - 1] !== ' ') {
        dir = 'w';
      }
      else {
        dir = 'e';
      }
    }
    else {
      if (y >= 0 && maze[y - 1][x] !== ' ') {
        dir = 'n';
      }
      else {
        dir = 's';
      }
    }
  }

  function move() {
    switch (dir) {
      case 'n': y--; break;
      case 's': y++; break;
      case 'w': x--; break;
      case 'e': x++; break;
    }
    steps++;
  }

  function takeAction() {
    switch (maze[y][x]) {
      // Do nothing
      case '|':
      case '-':
        break;

      // Change direction
      case '+':
        changeDirection();
        break;

      // Capture letter
      default:
        letters += maze[y][x];
        break;
    }

    // No matter what we do, move afterwards
    move();
  }

  // Current coordinates
  let x = maze[0].indexOf('|');
  let y = 0;
  let dir = 's';
  let letters = '';
  // The first '|' counts as an initial step,
  // but since we are taking an extra step at the end
  // to move the position off the path, we can offset
  // the step count here by setting it to 0.
  let steps = 0;

  do {
    takeAction();
  } while (!isAtEnd());

  console.log(`${steps} steps to find ${letters}`);
}

part1();
