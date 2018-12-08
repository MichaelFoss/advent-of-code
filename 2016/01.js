(() => {
	const input = 'L3, R1, L4, L1, L2, R4, L3, L3, R2, R3, L5, R1, R3, L4, L1, L2, R2, R1, L4, L4, R2, L5, R3, R2, R1, L1, L2, R2, R2, L1, L1, R2, R1, L3, L5, R4, L3, R3, R3, L5, L190, L4, R4, R51, L4, R5, R5, R2, L1, L3, R1, R4, L3, R1, R3, L5, L4, R2, R5, R2, L1, L5, L1, L1, R78, L3, R2, L3, R5, L2, R2, R4, L1, L4, R1, R185, R3, L4, L1, L1, L3, R4, L4, L1, R5, L5, L1, R5, L1, R2, L5, L2, R4, R3, L2, R3, R1, L3, L5, L4, R3, L2, L4, L5, L4, R1, L1, R5, L2, R4, R2, R3, L1, L1, L4, L3, R4, L3, L5, R2, L5, L1, L1, R2, R3, L5, L3, L2, L1, L4, R4, R4, L2, R3, R1, L2, R1, L2, L2, R3, R3, L1, R4, L5, L3, R4, R4, R1, L2, L5, L3, R1, R4, L2, R5, R4, R2, L5, L3, R4, R1, L1, R5, L3, R1, R5, L2, R1, L5, L2, R2, L2, L3, R3, R3, R1';

	// Take the input string and make instructions
	const data = input
		.split(', ')
		// .filter((obj, i) => i < 4)
		.map(s => ({
			turn: s[0],
			distance: parseInt(s.substr(1)),
		}));
	let firstDuplicate = undefined;
	const breadcrumbs = ['0,0'];

	// Directions
	const DIRECTIONS = {
		NORTH: 'N',
		EAST: 'E',
		SOUTH: 'S',
		WEST: 'W',
  };

	// Given a direction and a turn, return the new direction
	const makeTurn = ({ dir, turn, }) => {
		let newDir = undefined;
		switch (dir) {
      case DIRECTIONS.NORTH:
				return turn === 'R'
					? DIRECTIONS.EAST
					: DIRECTIONS.WEST;
      case DIRECTIONS.EAST:
				return turn === 'R'
					? DIRECTIONS.SOUTH
					: DIRECTIONS.NORTH;
      case DIRECTIONS.SOUTH:
				return turn === 'R'
					? DIRECTIONS.WEST
					: DIRECTIONS.EAST;
      case DIRECTIONS.WEST:
				return turn === 'R'
					? DIRECTIONS.NORTH
					: DIRECTIONS.SOUTH;
    }
  };

	// Given a position, direction, and distance,
	// returns a new distance
	const getPos = ({ pos, dir, distance, }) => {
		switch (dir) {
      case DIRECTIONS.NORTH:
				return {
					...pos,
					y: pos.y + distance,
            	};
      case DIRECTIONS.SOUTH:
				return {
					...pos,
					y: pos.y - distance,
            	};
      case DIRECTIONS.EAST:
				return {
					...pos,
					x: pos.x + distance,
            	};
      case DIRECTIONS.WEST:
				return {
					...pos,
					x: pos.x - distance,
            	};
    }
  };

	// Returns true if the current position has been seen before
	const exists = currPos => breadcrumbs.includes(`${curPos.x},${curPos.y}`);

	const dropBreadcrumbs = ({ pos, newPos, }) => {
    const prop = pos.x === newPos.x ? 'y' : 'x';
    let breadcrumb;
    if (pos[prop] < newPos[prop]) {
      for (let i = pos[prop] + 1; i <= newPos[prop] && !firstDuplicate; i++) {
			  breadcrumb = `${prop === 'x' ? i : pos.x},${prop === 'y' ? i : pos.y}`;
        if (breadcrumbs.includes(breadcrumb)) {
          firstDuplicate = { ...pos, [prop]: i, };
        }
        else {
		      breadcrumbs.push(breadcrumb);
        }
      }
    }
    else {
      for (let i = pos[prop] - 1; i >= newPos[prop] && !firstDuplicate; i--) {
			  breadcrumb = `${prop === 'x' ? i : pos.x},${prop === 'y' ? i : pos.y}`;
        if (breadcrumbs.includes(breadcrumb)) {
          firstDuplicate = { ...pos, [prop]: i, };
        }
        else {
		      breadcrumbs.push(breadcrumb);
        }
      }
    }
  };

	// The initial person
	let person = {
		pos: {
			x: 0,
			y: 0,
    },
		direction: DIRECTIONS.NORTH,
	};

	// The new person
	const newPerson = data.reduce((currPerson, move) => {
    // Get the new direction
		const newDir = makeTurn({
			dir: currPerson.direction,
			turn: move.turn,
    });

		// Get the new position
		const newPos = getPos({
			pos: currPerson.pos,
			dir: newDir,
			distance: move.distance,
    });

		// Drop a breadcrumb
		if (!firstDuplicate) {
			dropBreadcrumbs({
				pos: currPerson.pos,
				newPos,
      });
    }

		// Update the state
		return {
			pos: newPos,
			direction: newDir,
    };
  }, person);

	// Gets the taxi distance of a position
	const taxiDistance = pos => !!pos ? Math.abs(pos.x) + Math.abs(pos.y) : undefined;

	// Output the answer
	console.log(`Distance from HQ: ${taxiDistance(newPerson.pos)}`);
	console.log(`Distance from first duplicate: ${taxiDistance(firstDuplicate)}`);
})();

