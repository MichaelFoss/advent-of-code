function part1(input = 'abcdefghijklmnop') {

  // Test data = `baedc`;
  //let dancers = `abcde`.split('');
  //const moves = `s1,x3/4,pe/b`.split(',');

  // Actual data
  let dancers = input.split('');
  const moves = require('fs').readFileSync('./16.input.txt', 'utf8').split(',');

  let temp;
  let spinLength;
  let positions;

  for (let i = 0; i < moves.length; i++) {
    const command = moves[i];
    switch (command.substr(0, 1)) {
      case 's':
        spinLength = parseInt(command.substr(1));
        temp = dancers.splice(dancers.length - spinLength);
        dancers.unshift(...temp);
        break;

      case 'x':
        positions = command.substr(1).split('/').map(x => parseInt(x));
        temp = dancers[positions[0]];
        dancers[positions[0]] = dancers[positions[1]];
        dancers[positions[1]] = temp;
        break;

      case 'p':
        positions = command.substr(1).split('/').map(partner => dancers.indexOf(partner));
        temp = dancers[positions[0]];
        dancers[positions[0]] = dancers[positions[1]];
        dancers[positions[1]] = temp;
        break;
    }
  }

  console.log(`Dancers: ${dancers.join('')}`);
  return dancers.join('');
}

function part2(input = 'abcdefghijklmnop') {

  function getCommand(commandStr) {
    const command = {
      command: commandStr[0]
    };
    commandData = commandStr.substr(1);
    switch (command.command) {
      case 's':
        command.spinLength = parseInt(commandData);
        break;
      case 'x':
        command.positions = commandData.split('/').map(x => parseInt(x));
        break;
      case 'p':
        command.partners = commandData.split('/').map(partner => partner.charCodeAt(0) - 'a'.charCodeAt(0));
        break;
    }
    return command;
  }

  function parseDancers(dancers) {
    return dancers
      .map(dancer => String.fromCharCode(dancer + 'a'.charCodeAt(0)))
      .join('');
  }

  // Actual data
  let dancers = input.split('').map(x => x.charCodeAt(0) - 'a'.charCodeAt(0));
  const moves = require('fs').readFileSync('./16.input.txt', 'utf8').split(',').map(x => getCommand(x));

  const START_AT = 1;
  const previousDances = [];
  let temp;
  let positions;
  let danceNum;

  for (danceNum = START_AT; previousDances.indexOf(parseDancers(dancers)) === -1; danceNum++) {
    previousDances.push(parseDancers(dancers));

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      switch (move.command) {
        case 's':
          temp = dancers.splice(dancers.length - move.spinLength);
          dancers.unshift(...temp);
          break;

        case 'x':
          dancers[move.positions[0]] = dancers[move.positions[0]] ^ dancers[move.positions[1]];
          dancers[move.positions[1]] = dancers[move.positions[0]] ^ dancers[move.positions[1]];
          dancers[move.positions[0]] = dancers[move.positions[0]] ^ dancers[move.positions[1]];
          break;

        case 'p':
          positions = move.partners.map(partner => dancers.indexOf(partner));
          dancers[positions[0]] = dancers[positions[0]] ^ dancers[positions[1]];
          dancers[positions[1]] = dancers[positions[0]] ^ dancers[positions[1]];
          dancers[positions[0]] = dancers[positions[0]] ^ dancers[positions[1]];
          break;
      }
    }
  }

  console.log(`Dancers back to original position of ${parseDancers(dancers)} after ${danceNum} dances.`);
}

part1();
part2();

