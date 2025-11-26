import battleship from "./images/largeship5points.png";
import cruiser from "./images/mediumgreen3points.png";
import destroyer from "./images/mediumred3points.png";
import gunboat from "./images/smallgreen2points.png";
import sweeper from "./images/smallred2points.png";

let images = new Map();
images.set("Battleship", battleship);
images.set("Cruiser", cruiser);
images.set("Destroyer", destroyer);
images.set("Gunboat", gunboat);
images.set("Sweeper", sweeper);

export default images;
