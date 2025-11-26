import "./styles.css";
import { Ship, Gameboard, Player, Direction } from "./game.js";
import {
  human,
  computer,
  initialPlacementOfShips,
  drawShipsBoard,
  drawShipsLeft,
} from "./view.js";

initialPlacementOfShips();
drawShipsBoard();
drawShipsLeft();
