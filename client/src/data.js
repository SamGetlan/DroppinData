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




const chair = new Location('Chair', 'chair', '/locationPics/season5/D8.jpg', [150, 54], [35, 36]);
const lootLakeHouse = new Location('Loot Lake House', 'lootLakeHouse', '/locationPics/season5/E4.jpg', [54, 78], [39, 32]);
const westLootLake = new Location('West of Loot Lake', 'westLootLake', '/locationPics/season5/D4.jpg', [54, 54], [41, 43]);
const northLootLake = new Location('North of Loot Lake', 'northLootLake', '/locationPics/season5/E3.jpg', [30, 78], [47, 31]);
// const prison = new Location('Prison', 'prison', '/locationPics/season5/H8.jpg', [150, 150], [33, 41]);
const shippingContainers = new Location('Shipping Containers', 'shippingContainers', '/locationPics/season5/H4.jpg', [54, 150], [47, 32]);
const luckyLanding = new Location('Lucky Landing', 'luckyLanding', '/locationPics/season5/F9.jpg', [174, 102], [53, 40]);
const flushFactory = new Location('Flush Factory', 'flushFactory', '/locationPics/season5/D9.jpg', [174, 54], [43, 35]);
const tiltedTowers = new Location('Tilted Towers', 'tiltedTowers', '/locationPics/season5/D5.jpg', [78, 54], [44, 38]);
const shiftyShafts = new Location('Shifty Shafts', 'shiftyShafts', '/locationPics/season5/D7.jpg', [126, 54], [32, 39]);
const hauntedHills = new Location('Haunted Hills', 'hauntedHills', '/locationPics/season5/B2.jpg', [6, 6], [44, 34]);
// const anarchyAcres = new Location('Anarchy Acres', 'anarchyAcres', '/locationPics/season5/f2.jpg', [6, 102], [45, 31]);
const lazyLinks = new Location('Lazy Links', 'lazyLinks', '/locationPics/season5/F2.jpg', [6, 102], [45, 31]);
const lonelyLodge = new Location('Lonely Lodge', 'lonelyLodge', '/locationPics/season5/I5.jpg', [78, 174], [22, 46]);
const wailingWoods = new Location('Wailing Woods', 'wailingWoods', '/locationPics/season5/I3.jpg', [30, 174], [43, 33]);
// const moistyMire = new Location('Moisty Mire', 'moistyMire', '/locationPics/season5/i9.jpg', [174, 174], [34, 33]);
const paradisePalms = new Location('Paradise Palms', 'paradisePalms', '/locationPics/season5/I8.jpg', [150, 174], [34, 33]);
const fatalFields = new Location('Fatal Fields', 'fatalFields', '/locationPics/season5/F8.jpg', [150, 102], [39, 48]);
const greasyGrove = new Location('Greasy Grove', 'greasyGrove', '/locationPics/season5/C7.jpg', [126, 30], [29, 28]);
const snobbyShores = new Location('Snobby Shores', 'snobbyShores', '/locationPics/season5/B5.jpg', [78, 6], [33, 15]);
const junkJunction = new Location('Junk Junction', 'junkJunction', '/locationPics/season5/B2.jpg', [6, 6], [24, 43]);
const pleasantPark = new Location('Pleasant Park', 'pleasantPark', '/locationPics/season5/C3.jpg', [30, 30], [43, 40]);
const dustyDepot = new Location('Dusty Depot', 'dustyDepot', '/locationPics/season5/F5.jpg', [78, 102], [34, 45]);
const saltySprings = new Location('Salty Springs', 'saltySprings', '/locationPics/season5/F7.jpg', [126, 102], [27, 41]);
const retailRow = new Location('Retail Row', 'retailRow', '/locationPics/season5/H6.jpg', [102, 150], [30, 40]);
const tomatoTown = new Location('Tomato Town', 'tomatoTown', '/locationPics/season5/G4.jpg', [54, 126], [26, 40]);
const houseOnHill = new Location('House on the Hill', 'houseOnHill', '/locationPics/season5/E8.jpg', [150, 78], [26, 48]);
// const townWestOfMotel = new Location('Ruins West of Motel', 'townWestOfMotel', '/locationPics/season5/C2.jpg', [6, 30], [35, 36]);
// const townSouthOfDustyDepot = new Location('Town South of Dusty Depot', 'townSouthOfDustyDepot', '/locationPics/season4/placeHolder.jpg', [1, 1]);
const townNorthEastOfFlushFactory = new Location('Town Northeast of Flush Factory', 'townNorthEastOfFlushFactory', '/locationPics/season5/E9.jpg', [174, 78], [31, 31]);
const buildingsWestOfTiltedTowers = new Location('Buildings West of Tilted Towers', 'buildingsWestOfTiltedTowers', '/locationPics/season5/C5.jpg', [78, 30], [41, 30]);
const i7Buildings = new Location('I7 Buildings', 'i7Buildings', '/locationPics/season5/I7.jpg', [126, 174], [28, 35]);
const motel = new Location('Motel', 'motel', '/locationPics/season5/D2.jpg', [6, 54], [37, 44]);
const riskyReels = new Location('Risky Reels', 'riskyReels', '/locationPics/season5/H2.jpg', [6, 150], [44, 35]);
const mansionSouthOfLonelyLodge = new Location('Mansion South of Lonely Lodge', 'mansionSouthOfLonelyLodge', '/locationPics/season5/I5.jpg', [78, 154], [48, 64]); // Master's Mansion?
const dustyDivot = new Location('Dusty Divot', 'dustyDivot', '/locationPics/season5/F5.jpg', [78, 102], [46, 48]);
const buildingsEastOfJunkJunction = new Location('Buildings East of Junk Junciton', 'buildingsEastOfJunkJunction', '/locationPics/season5/C2.jpg', [6, 30], [18, 31]); // Seventy's Set? <-- Kinda looks like 70s show
const siloNortheastOfSnobbyShores = new Location('Suspicious Silo', 'siloNortheastOfSnobbyShores', '/locationPics/season5/B4.jpg', [54, 6], [46, 32]);
const trailerPark = new Location('Trailer Park', 'trailerPark', '/locationPics/season5/I5.jpg', [78, 174], [46, 35]);
const h9Hideout = new Location('South of Sweetwater', 'h9Hideout', '/locationPics/season5/H9.jpg', [174, 150], [46, 39]); // south of sweetwater? Little Las Mudas? <-- Both Westworld References
const g9Building = new Location('G9 Building', 'g9Building', '/locationPics/season5/G9.jpg', [174, 126], [37, 46]);
const i9Scrapyard = new Location('I9 Scrapyard', 'i9Scrapyard', '/locationPics/season5/I9.jpg', [174, 174], [30, 39]); //Southeast Scrapyard?
const i6Raceway = new Location('I6 Raceway', 'i6Raceway', '/locationPics/season5/I6.jpg', [102, 174], [41, 44]); // Rouch Raceway? Rocky Raceway? Red Raceway? Rapid Raceway?
const vikingVista = new Location('Viking Vista', 'vikingVista', '/locationPics/season5/B6.jpg', [102, 6], [29, 29]);
const locations = [chair, lootLakeHouse, westLootLake, northLootLake, shippingContainers, luckyLanding, flushFactory, tiltedTowers, shiftyShafts, hauntedHills, lazyLinks, lonelyLodge, wailingWoods, paradisePalms, fatalFields, greasyGrove, snobbyShores, junkJunction, pleasantPark, dustyDepot, saltySprings, retailRow, tomatoTown, houseOnHill, townNorthEastOfFlushFactory, buildingsWestOfTiltedTowers, i7Buildings, motel, riskyReels, mansionSouthOfLonelyLodge, dustyDivot, buildingsEastOfJunkJunction, siloNortheastOfSnobbyShores, trailerPark, h9Hideout, g9Building, i9Scrapyard, i6Raceway, vikingVista];



export default locations;
// module.exports.locations = locations;
