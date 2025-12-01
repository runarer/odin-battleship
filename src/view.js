import { Ship, Player, ComputerPlayer, Direction } from "./game";
import images from "./images";

import explosion from "./images/explosion.gif";
import splash from "./images/splash.gif";

const animatedIcon = new Image();
animatedIcon.id = "animatedIcon";

export let human = new Player("human");
export let computer = new ComputerPlayer(human);

export const initialPlacementOfShips = () => {
  try {
    human.gameboard.placeShip(new Ship(5, "Battleship", Direction.WEST), 5, 3);

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

    computer.gameboard.placeShip(
      new Ship(5, "Battleship", Direction.WEST),
      5,
      3,
    );

    computer.gameboard.placeShip(
      new Ship(3, "Destroyer", Direction.NORTH),
      1,
      3,
    );
    computer.gameboard.placeShip(
      new Ship(3, "Destroyer", Direction.SOUTH),
      1,
      9,
    );
    computer.gameboard.placeShip(
      new Ship(3, "Destroyer", Direction.EAST),
      5,
      0,
    );

    computer.gameboard.placeShip(new Ship(3, "Cruiser", Direction.WEST), 3, 7);
    computer.gameboard.placeShip(new Ship(3, "Cruiser", Direction.WEST), 4, 5);
    computer.gameboard.placeShip(new Ship(3, "Cruiser", Direction.SOUTH), 7, 8);

    computer.gameboard.placeShip(new Ship(2, "Gunboat", Direction.WEST), 0, 1);
    computer.gameboard.placeShip(new Ship(2, "Gunboat", Direction.NORTH), 3, 2);
    computer.gameboard.placeShip(new Ship(2, "Gunboat", Direction.WEST), 6, 1);
    computer.gameboard.placeShip(new Ship(2, "Gunboat", Direction.SOUTH), 8, 6);

    computer.gameboard.placeShip(new Ship(2, "Sweeper", Direction.SOUTH), 2, 6);
    computer.gameboard.placeShip(new Ship(2, "Sweeper", Direction.WEST), 3, 9);
    computer.gameboard.placeShip(new Ship(2, "Sweeper", Direction.NORTH), 9, 8);
    computer.gameboard.placeShip(new Ship(2, "Sweeper", Direction.EAST), 7, 9);
  } catch (err) {
    console.log(err);
  }
};

const _setTransformation = (shipDiv, ship) => {
  const padding = 30;
  let degree = 0; //Direction.NORTH

  let top = padding;
  let left = padding;

  if (ship.direction === Direction.NORTH) {
    if (ship.length > 3) {
      left -= 37;
    }
  } else if (ship.direction === Direction.EAST) {
    left += 75;
    degree = 90;
    if (ship.length > 3) {
      top -= 37;
    }
  } else if (ship.direction === Direction.SOUTH) {
    degree = 180;
    left += 75;
    top += 75;
    if (ship.length > 3) {
      left += 37;
    }
  } else if (ship.direction === Direction.WEST) {
    degree = 270;
    top += 75;
    if (ship.length > 3) {
      top += 37;
    }
  }
  shipDiv.style.position = "absolute";
  shipDiv.style.transform = `rotate(${degree}deg)`;
  shipDiv.style.transformOrigin = "top left";
  shipDiv.style.top = top + ship.y * 75 + "px";
  shipDiv.style.left = left + ship.x * 75 + "px";
};

const _createShipDiv = (ship) => {
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
  shipImg.src = images.get(`${ship.type}_${ship.length - ship.numberOfHits}`);
  shipDiv.appendChild(shipImg);

  return shipDiv;
};

const _createAndTransformShipDiv = (ship) => {
  const shipDiv = _createShipDiv(ship);

  _setTransformation(shipDiv, ship);

  return shipDiv;
};

export const drawShipsBoard = () => {
  const shipsDiv = document.createElement("div");
  human.gameboard.ships.forEach((ship) => {
    shipsDiv.appendChild(_createAndTransformShipDiv(ship));
  });
  return shipsDiv;
};

const addButtons = () => {
  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.id = "start";
  startButton.textContent = "Start";
  startButton.addEventListener("click", switchToGame);

  const randomizeButton = document.createElement("button");
  randomizeButton.type = "button";
  randomizeButton.id = "randomize";
  randomizeButton.textContent = "Randomize";
  randomizeButton.addEventListener("click", randomizeShipPlacements);

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  // console.log(buttons);
  buttons.appendChild(randomizeButton);
  buttons.appendChild(startButton);

  return buttons;
};

export const drawStartView = () => {
  const gameStartView = document.querySelector(".game");
  gameStartView.replaceChildren();

  // Draw board
  const gameboard = drawGameBoard();
  gameStartView.appendChild(gameboard);

  // Place buttons
  const buttons = addButtons();
  gameStartView.appendChild(buttons);

  // Place and draw ships
  initialPlacementOfShips();
  const shipsDiv = drawShipsBoard();
  gameboard.appendChild(shipsDiv);
};

/* Switches to game view */
const switchToGame = () => {
  const game = document.querySelector(".game");
  game.replaceChildren();

  const yourShips = document.createElement("div");
  yourShips.classList.add("yourShips");
  game.appendChild(yourShips);
  drawShipsLeft();

  const gameboard = drawGameBoard();
  addEventListenersToBoard(gameboard);
  game.appendChild(gameboard);
};

const addEventListenersToBoard = (gameboard) => {
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) {
      gameboard.children[j + i * 10].addEventListener(
        "click",
        (event) => {
          _sendAttack(event.target, j, i);
        },
        { once: true },
      );
    }
};

const newGame = () => {
  human = new Player();
  computer = new ComputerPlayer(human);
  drawStartView();
};

const gameOver = (text) => {
  const gameOverView = document.createElement("div");
  gameOverView.classList.add("gameover");

  const h1 = document.createElement("h1");
  h1.classList.add("gameover-text");
  h1.textContent = text;
  gameOverView.appendChild(h1);

  const restart = document.createElement("button");
  restart.type = "button";
  restart.classList.add("restart-button");
  restart.textContent = "Restart";
  restart.addEventListener("click", newGame);
  gameOverView.appendChild(restart);

  const game = document.querySelector(".game");
  game.replaceChildren(gameOverView);
};

const victory = () => {
  gameOver("Victory");
};

const defeat = () => {
  gameOver("Defeat");
};

const _createclickedIcon = (hit) => {
  // const icon = document.createElement("img");
  if (hit) animatedIcon.src = explosion;
  else animatedIcon.src = splash;
  return animatedIcon;
};

const _sendAttack = (div, x, y) => {
  const ship = computer.gameboard.receiveAttack(x, y);
  if (ship !== null) {
    // div.appendChild(_createclickedIcon(true));
    div.textContent = String.fromCodePoint(0x1f525);
    div.classList.add("hit");
    if (ship.isSunk()) {
      div.appendChild(_createAndTransformShipDiv(ship));
    }
  } else {
    // div.appendChild(_createclickedIcon(false));
    div.textContent = String.fromCodePoint(0x1f4a7);
    div.classList.add("missed");
  }
  div.classList.add("clicked-square");
  if (computer.gameboard.allShipsSunken()) {
    victory();
    return;
  }

  computer.turn();
  if (human.gameboard.allShipsSunken()) {
    defeat();
    return;
  }
  drawShipsLeft();
};

const randomizeShipPlacements = () => {
  // Remove ships
  // Try to place ships until all are legally placed
  console.log("Not implemented yet");
  victory();
};

/* Is there a way to do the placement with css?
   Placed based on class? */
const drawShipsLeft = () => {
  const gameDiv = document.querySelector(".yourShips");
  gameDiv.replaceChildren();

  const mediumShips = [
    "1/3/3/3",
    "1/4/3/4",
    "4/3/6/3",
    "4/4/6/4",
    "7/3/9/3",
    "7/4/9/4",
  ];
  let medium = 0;

  const smallShips = [
    "6/1/7/1",
    "6/2/7/2",
    "8/1/9/1",
    "8/2/9/2",
    "10/1/11/1",
    "10/2/11/2",
    "10/3/11/3",
    "10/4/11/4",
  ];
  let small = 0;

  human.gameboard.ships.forEach((ship) => {
    const shipDiv = _createShipDiv(ship);

    // Place them correctly in the grid
    if (ship.length === 5) {
      shipDiv.style.gridArea = "1/1/5/1";
    } else if (ship.length === 3) {
      shipDiv.style.gridArea = mediumShips[medium++];
    } else {
      shipDiv.style.gridArea = smallShips[small++];
    }

    gameDiv.appendChild(shipDiv);
  });
  // return gameDiv;
};

const drawGameBoard = () => {
  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");

  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) {
      const boardSquare = document.createElement("div");
      boardSquare.classList.add("board-square");
      gameboard.appendChild(boardSquare);
    }
  return gameboard;
};
