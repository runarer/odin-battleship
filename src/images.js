import battleship from "./images/largeship5pointsResize.png";
import cruiser from "./images/mediumgreen3pointsResize.png";
import destroyer from "./images/mediumred3pointsResize.png";
import gunboat from "./images/smallgreen2pointsResize.png";
import sweeper from "./images/smallred2pointsResize.png";

let images = new Map();
images.set("Battleship", battleship);
images.set("Cruiser", cruiser);
images.set("Destroyer", destroyer);
images.set("Gunboat", gunboat);
images.set("Sweeper", sweeper);

export default images;
