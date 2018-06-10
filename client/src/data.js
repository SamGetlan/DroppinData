function Location(name, camelCase, image, topLeft, start) {
  this.name = name;
  this.camelCase = camelCase;
  this.image = image;
  this.checked = true;
  this.topLeft = topLeft;
  this.start = start;
}

function GridSquare(name, camelCase, image, topLeft, center) {
  this.name = name;
  this.camelCase = camelCase;
  this.image = image;
  this.checked = true;
  this.topLeft = topLeft;
  this.start = start;
}



const names = ['Chair', 'Loot Lake House', 'West of Loot Lake', 'North of Loot Lake', 'Prison', 'Shipping Containers', 'Lucky Landing', 'Flush Factory', 'Tilted Towers', 'Shifty Shafts', 'Haunted Hills', 'Anarchy Acres', 'Lonely Lodge', 'Wailing Woods', 'Moisty Mire', 'Fatal Fields', 'Greasy Grove', 'Snobby Shores', 'Junk Junction', 'Pleasant Park', 'Dusty Depot', 'Salty Springs', 'Retail Row', 'Tomato Town', 'House on the Hill', 'Town west of Motel', 'Town south of Dusty Depot', 'Town northeast of Flush Factory', 'Buildings West of Tilted Towers', 'Buildings North of the Prison', 'Motel', 'Risky Reels', 'Mansion South of Lonely Lodge', 'Dusty Divot', 'Buildings East of Junk Junction', 'Silo in Mountain Northeast of Snobby Shores', 'Trailer Park'];
const chair = new Location(names[0], 'chair', '/locationPics/d8.jpg', [150, 54], [35, 36]);
const lootLakeHouse = new Location(names[1], 'lootLakeHouse', '/locationPics/e4.jpg', [54, 78], [39, 32]);
const westLootLake = new Location(names[2], 'westLootLake', '/locationPics/d4.jpg', [54, 54], [41, 43]);
const northLootLake = new Location(names[3], 'northLootLake', '/locationPics/e3.jpg', [30, 78], [47, 31]);
const prison = new Location(names[4], 'prison', '/locationPics/h8.jpg', [150, 150], [33, 41]);
const shippingContainers = new Location(names[5], 'shippingContainers', '/locationPics/h4.jpg', [54, 150], [47, 32]);
const luckyLanding = new Location(names[6], 'luckyLanding', '/locationPics/f9.jpg', [174, 102], [53, 40]);
const flushFactory = new Location(names[7], 'flushFactory', '/locationPics/d9.jpg', [174, 54], [43, 35]);
const tiltedTowers = new Location(names[8], 'tiltedTowers', '/locationPics/d5.jpg', [78, 54], [44, 38]);
const shiftyShafts = new Location(names[9], 'shiftyShafts', '/locationPics/d7.jpg', [126, 54], [32, 39]);
const hauntedHills = new Location(names[10], 'hauntedHills', '/locationPics/b2.jpg', [6, 6], [44, 34]);
const anarchyAcres = new Location(names[11], 'anarchyAcres', '/locationPics/f2.jpg', [6, 102], [45, 31]);
const lonelyLodge = new Location(names[12], 'lonelyLodge', '/locationPics/i5.jpg', [78, 174], [22, 46]);
const wailingWoods = new Location(names[13], 'wailingWoods', '/locationPics/i3.jpg', [30, 174], [43, 33]);
const moistyMire = new Location(names[14], 'moistyMire', '/locationPics/i9.jpg', [174, 174], [34, 33]);
const fatalFields = new Location(names[15], 'fatalFields', '/locationPics/f8.jpg', [150, 102], [39, 48]);
const greasyGrove = new Location(names[16], 'greasyGrove', '/locationPics/c7.jpg', [126, 30], [29, 28]);
const snobbyShores = new Location(names[17], 'snobbyShores', '/locationPics/b5.jpg', [78, 6], [33, 15]);
const junkJunction = new Location(names[18], 'junkJunction', '/locationPics/b2.jpg', [6, 6], [24, 43]);
const pleasantPark = new Location(names[19], 'pleasantPark', '/locationPics/c3.jpg', [30, 30], [43, 40]);
const dustyDepot = new Location(names[20], 'dustyDepot', '/locationPics/f5.jpg', [78, 102], [34, 45]);
const saltySprings = new Location(names[21], 'saltySprings', '/locationPics/f7.jpg', [126, 102], [27, 41]);
const retailRow = new Location(names[22], 'retailRow', '/locationPics/h6.jpg', [102, 150], [30, 40]);
const tomatoTown = new Location(names[23], 'tomatoTown', '/locationPics/g4.jpg', [54, 126], [26, 40]);
const houseOnHill = new Location(names[24], 'houseOnHill', '/locationPics/e8.jpg', [150, 78], [26, 48]);
const townWestOfMotel = new Location(names[25], 'townWestOfMotel', '/locationPics/c2.jpg', [6, 30], [35, 36]);
// const townSouthOfDustyDepot = new Location(names[26], 'townSouthOfDustyDepot', '/locationPics/placeHolder.jpg', [1, 1]);
const townNorthEastOfFlushFactory = new Location(names[27], 'townNorthEastOfFlushFactory', '/locationPics/e9.jpg', [174, 78], [31, 31]);
const buildingsWestOfTiltedTowers = new Location(names[28], 'buildingsWestOfTiltedTowers', '/locationPics/c5.jpg', [78, 30], [41, 30]);
const buildingsNorthOfPrison = new Location(names[29], 'buildingsNorthOfPrison', '/locationPics/i7.jpg', [126, 174], [30, 30]);
const motel = new Location(names[30], 'motel', '/locationPics/d2.jpg', [6, 54], [37, 44]);
const riskyReels = new Location(names[31], 'riskyReels', '/locationPics/h2.jpg', [6, 150], [44, 35]);
const mansionSouthOfLonelyLodge = new Location(names[32], 'mansionSouthOfLonelyLodge', '/locationPics/i5.jpg', [78, 154], [48, 64]);
const dustyDivot = new Location(names[33], 'dustyDivot', '/locationPics/f5.jpg', [78, 102], [46, 48]);
const buildingsEastOfJunkJunction = new Location(names[34], 'buildingsEastOfJunkJunction', '/locationPics/c2.jpg', [6, 30], [18, 31]);
const siloNortheastOfSnobbyShores = new Location(names[35], 'siloNortheastOfSnobbyShores', '/locationPics/b4.jpg', [54, 6], [46, 32]);
const trailerPark = new Location(names[36], 'trailerPark', '/locationPics/i5.jpg', [78, 174], [46, 35]);
const locations = [chair, lootLakeHouse, westLootLake, northLootLake, prison, shippingContainers, luckyLanding, flushFactory, tiltedTowers, shiftyShafts, hauntedHills, anarchyAcres, lonelyLodge, wailingWoods, moistyMire, fatalFields, greasyGrove, snobbyShores, junkJunction, pleasantPark, dustyDepot, saltySprings, retailRow, tomatoTown, houseOnHill, townWestOfMotel, townNorthEastOfFlushFactory, buildingsWestOfTiltedTowers, buildingsNorthOfPrison, motel, riskyReels, mansionSouthOfLonelyLodge, dustyDivot, buildingsEastOfJunkJunction, siloNortheastOfSnobbyShores, trailerPark];



export default locations;
// module.exports.locations = locations;
