import "./styles.css";
import { Ship, Gameboard, Player, Direction } from "./game.js";
import { human, computer, initialPlacementOfShips, drawShips } from "./view.js";

initialPlacementOfShips();
drawShips();
