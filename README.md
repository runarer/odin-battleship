# odin-battleship

The Odin Project: Battleship

Ship graphics created with tile set (https://opengameart.org/content/ships-with-ripple-effect), CC-BY 3.0.

## Notes

### One time click buttons:

From Guugle
To make a JavaScript button respond to a click only once, you can use the addEventListener method with the { once: true } option. This option ensures that the event listener is automatically removed after its first invocation.

Very usefull for the gameboard.

### Get source of event click

This is for getting the html element that triggered or is handling an event:
`event.target` or `event.currentTarget`. `currentTarget` gives the element that is currently handling the event.

### Working with images

Not used:
Explosion created with [Simple Explosion - Bleed's Game Art](https://opengameart.org/content/simple-explosion-bleeds-game-art)
Water splash created with [water splash](https://opengameart.org/content/water-splash)

Krita:
[Image Split](https://docs.krita.org/en/reference_manual/image_split.html)
[Grids and Guides Docker](https://docs.krita.org/en/reference_manual/dockers/grids_and_guides.html)
[How to make a gif in Krita](https://www.youtube.com/watch?v=hdE2XynyPf4)

[ezgif](https://ezgif.com/)
For removing loop, but now I need to reload the image.

Look into Canvas API animations and requestAnimationFrame. The gif approach seems messy.
For now, mark each square with :fire: og :droplet:, this needs `String.fromCodePoint(0x1f4a7)`
