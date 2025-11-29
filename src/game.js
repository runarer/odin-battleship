export const Direction = {
  NORTH: "NORTH",
  WEST: "WEST",
  SOUTH: "SOUTH",
  EAST: "EAST",
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
  // sunk = false;
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
  ships = [];
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

  _getShipPlacement(ship, x, y) {
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

    return shipPlacement;
  }

  _canShipBePlaced(shipPlacement) {
    for (let coor of shipPlacement) {
      if (coor.x < 0 || coor.x > 9 || coor.y < 0 || coor.y > 9)
        throw new Error("Outside gameboard");
      if (this.board[coor.y][coor.x] !== null)
        throw new Error(`Collision with ${coor.x} ${coor.y}`);
    }
  }
  placeShip(ship, x, y) {
    // Can ship be places?
    const shipPlacement = this._getShipPlacement(ship, x, y);
    console.log(shipPlacement);
    try {
      this._canShipBePlaced(shipPlacement);
    } catch (err) {
      throw err;
    }

    // Place ship
    this.ships.push(ship);
    ship.x = x;
    ship.y = y;
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
    console.log(line, row);

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
      if (boat.isSunk()) this._opponentsMap[y][x] = this.Discoveries.SUNK;
      else this._opponentsMap[y][x] = this.Discoveries.BOAT;
    } else {
      this._opponentsMap[y][x] = this.Discoveries.WATER;
    }
  }

  turn() {
    // if (this._boatsFound.length > 0) {
    //   const boat = this._boatsFound.at(-1);
    //   if (this._opponent.gameboard.board[boat.y][boat.x].isSunk()) {
    //     this._boatsFound.pop();
    //     return this.turn();
    //   }
    // } else {
    let move = this._newRandomMove();
    this.makeMove(move.x, move.y);
    this._printOpponentMap();
    // }
  }
}
