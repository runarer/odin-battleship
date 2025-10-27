import { Ship, Gameboard, Player, Direction } from "./game";

test("Sink a ship with length 2", () => {
  const ship = new Ship(2, "Destroyer", Direction.NORTH);
  expect(ship.hit().isSunk()).toBe(false);
  expect(ship.hit().isSunk()).toBe(true);
  expect(ship.hit().isSunk()).toBe(true);
});

test("Place a ship outside", () => {
  const gameboard = new Gameboard();
  const ship4 = new Ship(4, "Frigate", Direction.EAST);
  const ship5 = new Ship(5, "Battleship", Direction.WEST);
  const ship3 = new Ship(3, "Cruiser", Direction.SOUTH);
  const ship2 = new Ship(2, "Gunboat", Direction.NORTH);

  expect(() => gameboard.placeShip(ship4, -1, 0)).toThrow("Outside gameboard");
  expect(() => gameboard.placeShip(ship4, 0, -1)).toThrow("Outside gameboard");
  expect(() => gameboard.placeShip(ship4, 10, 0)).toThrow("Outside gameboard");
  expect(() => gameboard.placeShip(ship4, 0, 10)).toThrow("Outside gameboard");

  expect(() => gameboard.placeShip(ship4, 2, 0)).toThrow("Outside gameboard");
  expect(() => gameboard.placeShip(ship3, 0, 1)).toThrow("Outside gameboard");
  expect(() => gameboard.placeShip(ship5, 8, 8)).toThrow("Outside gameboard");
  expect(() => gameboard.placeShip(ship2, 8, 9)).toThrow("Outside gameboard");
});

test("Place a ship inside in each direction", () => {
  const gameboard = new Gameboard();
  const shipN = new Ship(4, "Frigate", Direction.NORTH);
  const shipE = new Ship(4, "Frigate", Direction.EAST);
  const shipS = new Ship(4, "Frigate", Direction.SOUTH);
  const shipW = new Ship(4, "Frigate", Direction.WEST);
  expect(() => gameboard.placeShip(shipN, 0, 0)).not.toThrow();
  expect(() => gameboard.placeShip(shipE, 8, 9)).not.toThrow();
  expect(() => gameboard.placeShip(shipS, 9, 9)).not.toThrow();
  expect(() => gameboard.placeShip(shipW, 1, 0)).not.toThrow();
});

test("Collision with a ship", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(4, "Frigate", Direction.NORTH);
  const ship2 = new Ship(2, "Gunboat", Direction.NORTH);
  gameboard.placeShip(ship1, 4, 5);
  expect(() => gameboard.placeShip(ship2, 4, 5)).toThrow(/^Collision with /);
});

test("Recive attack", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2, "Frigate", Direction.NORTH);
  gameboard.placeShip(ship, 0, 0);
  gameboard.receiveAttack(2, 2);
  expect(gameboard.missed).toContainEqual({ x: 2, y: 2 });
  gameboard.receiveAttack(0, 0);
  expect(gameboard.ships[0].numberOfHits).toBe(1);
  expect(gameboard.ships[0].isSunk()).toBe(false);
  gameboard.receiveAttack(0, 1);
  expect(gameboard.ships[0].isSunk()).toBe(true);
});

test("All ships sunken", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(2, "Gunboat", Direction.NORTH);
  const ship2 = new Ship(2, "Gunboat", Direction.WEST);

  gameboard.placeShip(ship1, 0, 0);
  gameboard.placeShip(ship2, 1, 0);
  expect(gameboard.allShipsSunken()).toBe(false);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  expect(gameboard.allShipsSunken()).toBe(false);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  expect(gameboard.allShipsSunken()).toBe(true);
});
