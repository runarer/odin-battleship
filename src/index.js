import "./styles.css";
import { Ship, Gameboard, Player, Direction } from "./game.js";
import {
  human,
  computer,
  initialPlacementOfShips,
  drawShipsBoard,
  drawShipsLeft,
  drawStartView,
  hittest,
} from "./view.js";

drawStartView();
hittest();
