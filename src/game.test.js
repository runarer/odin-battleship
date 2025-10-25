import { Ship, Gameboard, Player } from "./game";

test("Sink a ship with length 2", () => {
  const ship = new Ship(2);
  expect(ship.hit().isSunk()).toBe(false);
  expect(ship.hit().isSunk()).toBe(true);
  expect(ship.hit().isSunk()).toBe(true);
});

test("Place a ship outside", () => {
  const gameboard = new Gameboard();
  expect(() => gameboard.placeShip(4, "EAST", -1, 0)).toThrow(
    "Outside gameboard",
  );
  expect(() => gameboard.placeShip(4, "EAST", 0, -1)).toThrow(
    "Outside gameboard",
  );
  expect(() => gameboard.placeShip(4, "EAST", 10, 0)).toThrow(
    "Outside gameboard",
  );
  expect(() => gameboard.placeShip(4, "EAST", 0, 10)).toThrow(
    "Outside gameboard",
  );

  expect(() => gameboard.placeShip(4, "EAST", 2, 0)).toThrow(
    "Outside gameboard",
  );
  expect(() => gameboard.placeShip(3, "SOUTH", 0, 1)).toThrow(
    "Outside gameboard",
  );
  expect(() => gameboard.placeShip(5, "WEST", 8, 8)).toThrow(
    "Outside gameboard",
  );
  expect(() => gameboard.placeShip(2, "NORTH", 8, 9)).toThrow(
    "Outside gameboard",
  );
});

test("Place a ship inside in each direction", () => {
  const gameboard = new Gameboard();
  expect(() => gameboard.placeShip(4, "NORTH", 0, 0)).not.toThrow();
  expect(() => gameboard.placeShip(4, "EAST", 8, 9)).not.toThrow();
  expect(() => gameboard.placeShip(4, "SOUTH", 9, 9)).not.toThrow();
  expect(() => gameboard.placeShip(4, "WEST", 1, 0)).not.toThrow();
});

test("Collision with a ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(4, "NORTH", 4, 5);
  expect(() => gameboard.placeShip(2, "NORTH", 4, 5)).toThrow(
    /^Collision with /,
  );
});

test("Recive attack", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, "NORTH", 0, 0);
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
  gameboard.placeShip(2, "NORTH", 0, 0);
  gameboard.placeShip(2, "WEST", 1, 0);
  expect(gameboard.allShipsSunken()).toBe(false);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  expect(gameboard.allShipsSunken()).toBe(false);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  expect(gameboard.allShipsSunken()).toBe(true);
});
