export const Direction = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

export class Player {
  type;
  gameboard;
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

export class Ship {
  length;
  numberOfHits = 0;
  type;
  direction;
  x;
  y;

  constructor(length, type, direction) {
    this.length = length;
    this.type = type;
    this.direction = direction;
  }

  hit() {
    this.numberOfHits++;
    return this;
  }

  isSunk() {
    return this.length <= this.numberOfHits;
  }
}

export class Gameboard {
  ships = [
    new Ship(5, "Battleship", Direction.WEST),
    new Ship(3, "Destroyer", Direction.NORTH),
    new Ship(3, "Destroyer", Direction.SOUTH),
    new Ship(3, "Destroyer", Direction.EAST),
    new Ship(3, "Cruiser", Direction.WEST),
    new Ship(3, "Cruiser", Direction.WEST),
    new Ship(3, "Cruiser", Direction.SOUTH),
    new Ship(2, "Gunboat", Direction.WEST),
    new Ship(2, "Gunboat", Direction.NORTH),
    new Ship(2, "Gunboat", Direction.WEST),
    new Ship(2, "Gunboat", Direction.SOUTH),
    new Ship(2, "Sweeper", Direction.SOUTH),
    new Ship(2, "Sweeper", Direction.WEST),
    new Ship(2, "Sweeper", Direction.NORTH),
    new Ship(2, "Sweeper", Direction.EAST),
  ];

  board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];
  missed = [];

  getShipPlacement(ship) {
    const x = ship.x;
    const y = ship.y;
    const shipPlacement = [{ x, y }];

    for (let i = 1; i < ship.length; i++) {
      if (ship.direction === Direction.NORTH) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x,
          y: shipPlacement[i - 1].y + 1,
        };
      } else if (ship.direction === Direction.EAST) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x - 1,
          y: shipPlacement[i - 1].y,
        };
      } else if (ship.direction === Direction.SOUTH) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x,
          y: shipPlacement[i - 1].y - 1,
        };
      } else if (ship.direction === Direction.WEST) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x + 1,
          y: shipPlacement[i - 1].y,
        };
      }
    }
    console.log(shipPlacement);

    return shipPlacement;
  }

  _canShipBePlaced(shipPlacement) {
    for (let coor of shipPlacement) {
      if (coor.x < 0 || coor.x > 9 || coor.y < 0 || coor.y > 9)
        // throw new Error("Outside gameboard");
        return false;
      if (this.board[coor.y][coor.x] !== null)
        // throw new Error(`Collision with ${coor.x} ${coor.y}`);
        return false;
    }
    return true;
  }
  placeShip(ship) {
    // Can ship be places?
    const shipPlacement = this.getShipPlacement(ship);
    // console.log(shipPlacement);
    // try {
    //   this._canShipBePlaced(shipPlacement);
    // } catch (err) {
    //   throw err;
    // }
    if (!this._canShipBePlaced(shipPlacement)) return false;

    // Place ship
    // this.ships.push(ship);
    // ship.x = x;
    // ship.y = y;
    for (let coor of shipPlacement) {
      this.board[coor.y][coor.x] = ship;
    }

    return true;
  }

  receiveAttack(x, y) {
    const ship = this.board[y][x];
    if (ship === null) {
      this.missed.push({ x, y });
    } else {
      ship.hit();
    }
    return ship;
  }
  allShipsSunken() {
    return this.ships.every((ship) => ship.isSunk());
  }

  placeAllShips() {
    const collitionError = /^Collision/;

    for (let ship of ships) {
      while (true)
        try {
          const posision = this._getRandomPos(ship);
          this.placeShip(ship, ...posision);
          break;
        } catch (err) {
          if (collitionError.test(err.message)) continue;
          else throw err;
        }
    }
  }

  _randomizeShipPos(length, direction) {
    let x = Math.floor(Math.random() * this.board.length);
    let y = Math.floor(Math.random() * this.board.length);
    if (direction === Direction.NORTH)
      y = Math.floor(Math.random() * (this.board.length - length + 1));
    if (direction === Direction.SOUTH)
      y =
        Math.floor(Math.random() * (this.board.length - length + 1)) +
        length -
        1;
    if (direction === Direction.EAST)
      x =
        Math.floor(Math.random() * (this.board.length - length + 1)) +
        length -
        1;
    if (direction === Direction.WEST)
      x = Math.floor(Math.random() * (this.board.length - length + 1));
    return { x, y };
  }
  randomizeShips() {
    this.ships.forEach((ship) => {
      do {
        ship.direction = Math.floor(Math.random() * 4);
        const { x, y } = this._randomizeShipPos(ship.length, ship.direction);
        ship.x = x;
        ship.y = y;
      } while (!this.placeShip(ship));
    });
  }
}

export class ComputerPlayer extends Player {
  Discoveries = {
    UNKNOWN: "U",
    BOAT: "B",
    WATER: "W",
    SUNK: "S",
  };
  _opponentsMap = new Array(10)
    .fill()
    .map(() => Array(10).fill(this.Discoveries.UNKNOWN));
  _opponent;

  constructor(player) {
    super("computer");
    this._opponent = player;
  }

  _printOpponentMap() {
    console.log("------------------------------------------------------");
    for (let i = 0; i < this._opponentsMap.length; i++) {
      console.log(this._opponentsMap[i]);
    }
  }

  // Creates some random coordiantes. If already tried, get next in list,
  // looping the end to front.
  _newRandomMove() {
    let line = Math.floor(Math.random() * 10);
    let row = Math.floor(Math.random() * 10);
    // console.log(line, row);

    while (this._opponentsMap[line][row] !== this.Discoveries.UNKNOWN) {
      if (line === 9 && row === 9) {
        line = 0;
        row = 0;
        continue;
      }
      if (row === 9) {
        line++;
        row = 0;
        continue;
      }
      row++;
    }
    return { x: row, y: line };
  }

  makeMove(x, y) {
    const boat = this._opponent.gameboard.receiveAttack(x, y);
    if (boat !== null) {
      if (boat.isSunk()) {
        const sunkenBoat = this._opponent.gameboard.getShipPlacement(
          boat,
          boat.x,
          boat.y,
        );
        sunkenBoat.forEach((square) => {
          this._opponentsMap[square.y][square.x] = this.Discoveries.SUNK;
        });
      } else this._opponentsMap[y][x] = this.Discoveries.BOAT;
    } else {
      this._opponentsMap[y][x] = this.Discoveries.WATER;
    }
  }

  _findFirstDiscoveredBoat() {
    let boatFound = null;
    for (let i = 0; i < this._opponentsMap.length; i++) {
      for (let j = 0; j < this._opponentsMap[i].length; j++) {
        if (this._opponentsMap[i][j] === "B") {
          return { x: j, y: i };
        }
      }
    }
    return boatFound;
  }

  _newNonRandomMove(x, y) {
    const dirV = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ];
    // let move = null;
    let direction = Direction.NORTH;
    // Due to the way _findFirstDiscoveredBoat work there will be no B above
    // or to the left.
    if (
      x < this._opponentsMap[0].length - 1 &&
      this._opponentsMap[y][x + 1] === "B"
    ) {
      direction = Direction.EAST;
    }

    while (this._opponentsMap[y][x] !== "U") {
      // Do we need to change direction
      const newX = x + dirV[direction].x;
      const newY = y + dirV[direction].y;
      if (
        newX > 9 ||
        newY > 9 ||
        newX < 0 ||
        newY < 0 ||
        this._opponentsMap[newY][newX] === "S" ||
        this._opponentsMap[newY][newX] === "W"
      ) {
        if (direction === Direction.NORTH) direction = Direction.SOUTH;
        else if (direction === Direction.SOUTH) direction = Direction.EAST;
        else if (direction === Direction.EAST) direction = Direction.WEST;
        else direction = Direction.NORTH;
        continue;
      }

      x += dirV[direction].x;
      y += dirV[direction].y;
    }

    return { x, y };
  }

  turn() {
    let move = null;

    const boatFound = this._findFirstDiscoveredBoat();
    if (boatFound === null) {
      move = this._newRandomMove();
    } else {
      move = this._newNonRandomMove(boatFound.x, boatFound.y);
    }
    this.makeMove(move.x, move.y);
    this._printOpponentMap();
  }
}
