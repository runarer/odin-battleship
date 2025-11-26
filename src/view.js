import { Ship, Player, Gameboard, Direction } from "./game";
import images from "./images";

export const human = new Player("human");
export const computer = new Player();

export function initialPlacementOfShips() {
  try {
    human.gameboard.placeShip(new Ship(5, "Battleship", Direction.NORTH), 5, 3);

    human.gameboard.placeShip(new Ship(3, "Destroyer", Direction.NORTH), 1, 3);
    human.gameboard.placeShip(new Ship(3, "Destroyer", Direction.SOUTH), 1, 9);
    human.gameboard.placeShip(new Ship(3, "Destroyer", Direction.EAST), 5, 0);

    human.gameboard.placeShip(new Ship(3, "Cruiser", Direction.WEST), 3, 7);
    human.gameboard.placeShip(new Ship(3, "Cruiser", Direction.WEST), 4, 5);
    human.gameboard.placeShip(new Ship(3, "Cruiser", Direction.SOUTH), 7, 8);

    human.gameboard.placeShip(new Ship(2, "Gunboat", Direction.WEST), 0, 1);
    human.gameboard.placeShip(new Ship(2, "Gunboat", Direction.NORTH), 3, 2);
    human.gameboard.placeShip(new Ship(2, "Gunboat", Direction.WEST), 6, 1);
    human.gameboard.placeShip(new Ship(2, "Gunboat", Direction.SOUTH), 8, 6);

    human.gameboard.placeShip(new Ship(2, "Sweeper", Direction.SOUTH), 2, 6);
    human.gameboard.placeShip(new Ship(2, "Sweeper", Direction.WEST), 3, 9);
    human.gameboard.placeShip(new Ship(2, "Sweeper", Direction.NORTH), 9, 8);
    human.gameboard.placeShip(new Ship(2, "Sweeper", Direction.EAST), 7, 9);
  } catch (err) {
    console.log(err);
  }
}

function _setTransformation(shipDiv, ship) {
  const padding = 30;
  let degree = 0; //Direction.NORTH

  let top = padding;
  let left = padding;

  if (ship.direction === Direction.NORTH) {
  } else if (ship.direction === Direction.EAST) {
    left += 75;
    degree = 90;
  } else if (ship.direction === Direction.SOUTH) {
    degree = 180;
    left += 75;
    top += 75;
  } else if (ship.direction === Direction.WEST) {
    degree = 270;
    top += 75;
    if (ship.length > 3) {
      top += 75;
    }
  }
  shipDiv.style.transform = `rotate(${degree}deg)`;
  shipDiv.style.transformOrigin = "top left";
  shipDiv.style.top = top + ship.y * 75 + "px";
  shipDiv.style.left = left + ship.x * 75 + "px";
}

// function _setTransformation(shipDiv, ship) {
//   const image = shipDiv.querySelector(".ship");
//   const padding = 30;
//   let degree = 0; //Direction.NORTH

//   let top = padding;
//   let left = padding;

//   const imgWidth = image.naturalWidth;

//   if (ship.direction === Direction.NORTH) {
//     left -= (imgWidth % 75) / 2;
//   } else if (ship.direction === Direction.EAST) {
//     degree = 90;
//     left += 75;
//     top -= (image.naturalWidth % 75) / 2;
//   } else if (ship.direction === Direction.SOUTH) {
//     degree = 180;
//     top += 75;
//     left += 75;
//     left += (imgWidth % 75) / 2;
//   } else if (ship.direction === Direction.WEST) {
//     degree = 270;
//     top += 75 + (image.naturalWidth % 75) / 2;
//   }
//   shipDiv.style.transform = `rotate(${degree}deg)`;
//   shipDiv.style.top = top + ship.y * 75 + "px";
//   shipDiv.style.left = left + ship.x * 75 + "px";
// }

function _createShipDiv(ship) {
  const shipDiv = document.createElement("div");
  shipDiv.classList.add("ship");
  if (ship.length == 5) {
    shipDiv.classList.add("largeship");
  } else if (ship.length == 3) {
    shipDiv.classList.add("mediumship");
  } else {
    shipDiv.classList.add("smallship");
  }

  const shipImg = document.createElement("img");
  shipImg.src = images.get(ship.type);
  shipDiv.appendChild(shipImg);

  _setTransformation(shipDiv, ship);

  return shipDiv;
}

export function drawShips() {
  const gameDiv = document.querySelector(".game");
  human.gameboard.ships.forEach((ship) => {
    gameDiv.appendChild(_createShipDiv(ship));
  });
}
