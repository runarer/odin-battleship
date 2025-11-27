import battleship from "./images/largeship5points.png";
import cruiser from "./images/mediumgreen3points.png";
import destroyer from "./images/mediumred3points.png";
import gunboat from "./images/smallgreen2points.png";
import sweeper from "./images/smallred2points.png";

import battleship_4 from "./images/largeship4points.png";
import battleship_3 from "./images/largeship3points.png";
import battleship_2 from "./images/largeship2points.png";
import battleship_1 from "./images/largeship1points.png";
import battleship_0 from "./images/largeship0points.png";

import cruiser_2 from "./images/mediumgreen2points.png";
import cruiser_1 from "./images/mediumgreen1points.png";
import cruiser_0 from "./images/mediumgreen0points.png";

import destroyer_2 from "./images/mediumred2points.png";
import destroyer_1 from "./images/mediumred1points.png";
import destroyer_0 from "./images/mediumred0points.png";

import gunboat_1 from "./images/smallgreen1points.png";
import gunboat_0 from "./images/smallgreen0points.png";

import sweeper_1 from "./images/smallred1points.png";
import sweeper_0 from "./images/smallred0points.png";

let images = new Map();

images.set("Battleship_5", battleship);
images.set("Battleship_4", battleship_4);
images.set("Battleship_3", battleship_3);
images.set("Battleship_2", battleship_2);
images.set("Battleship_1", battleship_1);
images.set("Battleship_0", battleship_0);

images.set("Cruiser_3", cruiser);
images.set("Cruiser_2", cruiser_2);
images.set("Cruiser_1", cruiser_1);
images.set("Cruiser_0", cruiser_0);

images.set("Destroyer_3", destroyer);
images.set("Destroyer_2", destroyer_2);
images.set("Destroyer_1", destroyer_1);
images.set("Destroyer_0", destroyer_0);

images.set("Gunboat_2", gunboat);
images.set("Gunboat_1", gunboat_1);
images.set("Gunboat_0", gunboat_0);

images.set("Sweeper_2", sweeper);
images.set("Sweeper_1", sweeper_1);
images.set("Sweeper_0", sweeper_0);

export default images;
