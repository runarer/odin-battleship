export const Direction = {
  NORTH: "NORTH",
  WEST: "WEST",
  SOUTH: "SOUTH",
  EAST: "EAST",
};

export class Ship {
  length;
  numberOfHits = 0;
  sunk = false;
  type;
  direction;

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
    try {
      this._canShipBePlaced(shipPlacement);
    } catch (err) {
      throw err;
    }

    // Place ship
    this.ships.push(ship);
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
  }
  allShipsSunken() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export class Player {
  type;
  gameboard;

  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }
}
