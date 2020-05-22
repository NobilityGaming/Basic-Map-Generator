// Module Imports--------------------------------------
const seedrandom = require('seedrandom');
const Canvas = require('canvas');
const fs = require('fs')

// Map Variables---------------------------------------
var lenght = 100
var width = 100
var rng = seedrandom('bruh');  // the seed of the map
var inherent = 0.85;                    // % chance to inherent a tile (the "smoothness" of the map)
var bias = 0.5;                         // bais between using oldhex2 (x) or oldhex1 (y)
var upgradeocean = 0.5;                 // % chance to upgrade an ocean tile
var upgradeshore = 0.6;                 // % chance to upgrade a shore tile
var upgradebeach = 0.6;                 // % chance to upgrade a beach tile
var upgradegrass = 0.4;                 // % chance to upgrade a grass tile
var upgradeforest = 0.4;                // % chance to upgrade a forest tile
var upgrademountain = 0.5;              // % chance to upgrade a mountain tile
var downgradesnow = 0.75;               // % chance to downgrade a snow tile
var ocean = `#0061ff`;
var shore = `#0094ff`;
var beach = `#ffe877`;
var grass = `#00a746`;
var forest = `#007f46`;
var mountain = `#6a7a7a`;
var snow = `#ffffff`;
const canvas = Canvas.createCanvas(lenght, width);
const out = fs.createWriteStream('test.png')
const stream = canvas.createPNGStream()
const ctx = canvas.getContext('2d');

// Functions-------------------------------------------
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function main(x, y) {
    var p = ctx.getImageData(x, y, 1, 1).data;
        var oldhex = rgbToHex(p[0], p[1], p[2])
        num = rng()
        if (oldhex == ocean) {
            if (num <= upgradeocean) {
                newhex = shore
            }
            else {
                newhex = ocean
            }
        }
        if (oldhex == shore) {
            if (num <= upgradeshore) {
                newhex = beach
            }
            else {
                newhex = ocean
            }
        }
        if (oldhex == beach) {
            if (num <= upgradebeach) {
                newhex = grass
            }
            else {
                newhex = shore
            }
        }
        if (oldhex == grass) {
            if (num <= upgradegrass) {
                newhex = forest
            }
            else {
                newhex = beach
            }
        }
        if (oldhex == forest) {
            if (num <= upgradeforest) {
                newhex = mountain
            }
            else {
                newhex = grass
            }
        }
        if (oldhex == mountain) {
            if (num <= upgrademountain) {
                newhex = forest
            }
            else {
                newhex = snow
            }
        }
        if (oldhex == snow) {
            if (num <= downgradesnow) {
                newhex = mountain
            }
            else {
                newhex = snow
            }
        }
        return [newhex, oldhex]
}

// Logic-----------------------------------------------
x = 0
y = 0
while (x <= lenght - 1 && y <= width - 1) {

    if (y > 0) {
        var output = main(x, y-1)
        var newhex = output[0]
        var oldhex1 = output[1]
    }

    if (x > 0) {
        var output = main(x-1, y)
        var newhex = output[0]
        var oldhex2 = output[1]
    }

    if (x == 0 || y == 0 || x == lenght - 1 || y == width - 1) {
        hex = ocean
    }

    else if (oldhex1 == oldhex2) {
        num = rng()
        if (num <= inherent) {
            hex = oldhex1
        }
        else {
            hex = newhex
        }
    }

    else {
        num = rng()
        if (num <= bias) {
            hex = oldhex1
        }
        else {
            hex = oldhex2
        }
    }

    ctx.fillStyle = hex;
    ctx.fillRect(x, y, 1, 1)
    console.log(x, y, hex)

    if (x == lenght - 1) {
        x = 0
        y = y + 1
    }

    else {
        x += 1
    }
}
stream.pipe(out)
