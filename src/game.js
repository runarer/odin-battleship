const Direction = {
  NORTH: "NORTH",
  WEST: "WEST",
  SOUTH: "SOUTH",
  EAST: "EAST",
};

export class Ship {
  length;
  numberOfHits = 0;
  sunk = false;

  constructor(length) {
    this.length = length;
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  missed = [];

  _getShipPlacement(length, direction, x, y) {
    const shipPlacement = [{ x, y }];
    for (let i = 1; i < length; i++) {
      if (direction === Direction.NORTH) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x,
          y: shipPlacement[i - 1].y + 1,
        };
      } else if (direction === Direction.EAST) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x - 1,
          y: shipPlacement[i - 1].y,
        };
      } else if (direction === Direction.SOUTH) {
        shipPlacement[i] = {
          x: shipPlacement[i - 1].x,
          y: shipPlacement[i - 1].y - 1,
        };
      } else if (direction === Direction.WEST) {
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
      if (this.board[coor.y][coor.x] !== 0)
        throw new Error(`Collision with ${coor.x} ${coor.y}`);
    }
  }
  placeShip(shipLength, direction, x, y) {
    // Can ship be places?
    const shipPlacement = this._getShipPlacement(shipLength, direction, x, y);
    try {
      this._canShipBePlaced(shipPlacement);
    } catch (err) {
      throw err;
    }

    // Place ship
    this.ships.push(new Ship(shipLength));
    for (let coor of shipPlacement) {
      this.board[coor.y][coor.x] = this.ships.length;
    }

    return true;
  }

  receiveAttack(x, y) {
    const boardValue = this.board[y][x];
    if (boardValue === 0) {
      this.missed.push({ x, y });
    } else {
      this.ships[boardValue - 1].hit();
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
