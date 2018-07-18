// const mongoose = require('mongoose');
// const config = require('./config.js');
// const { Game, User } = require('./models.js');
// const locations = require('../client/src/data.js').locations;  // requires data.js to export locations as module.exports.locations rather than export default

// mongoose.connect(`mongodb://${config.username}:${config.password}@ds119585.mlab.com:19585/droppin_data`);

// mongoose.connection.once('open', () => {
//   console.log('Connection has been made, now make fireworks...');
// }).on('error', (error) => {
//   console.log('Connection error:', error);
// });


// Game.find({}, null, null, (err, games) => {
//   if (err) {
//     console.log('error:', err);
//   } else {
//     for (var i = 0; i < games.length; i++) {
//       console.log(games[i].startCoordinates);
//       if (games[i].startCoordinates === undefined || games[i].startCoordinates.length === 0) {
//         for (var k = 0; k < locations.length; k++) {
//           if (locations[k].name === games[i].location) {
//             let rows = locations[k].topLeft[0] + locations[k].start[0];
//             let cols = locations[k].topLeft[1] + locations[k].start[1];
//             games[i].startCoordinates = [rows, cols];
//             console.log(`Game ${i} startCoordinates: ${games[i].startCoordinates}`)
//           }
//           if (games[i].deathLocation !== undefined) {
//             for (var j = 0; j < locations.length; j++) {
//               if (games[i].deathLocation === locations[j].camelCase) {
//                 let rows = Math.floor((locations[j].topLeft[0] + locations[j].start[0]) / 3);
//                 let cols = Math.floor((locations[j].topLeft[1] + locations[j].start[1]) / 3);
//                 games[i].deathCoordinates = [rows, cols];
//                 console.log(`Game ${i} deathCoordinates: ${games[i].deathCoordinates}`);
//               }
//             }
//           }
//         }
//       }
//       games[i].save((err, result) => {
//         if (err) {
//           console.log('error saving the game:', err);
//         } else {
//           console.log(`Game saved`);
//         }
//       })
//     }
//   }
// })


// Game.find({user: 'Testing'}, null, null, (err, games) => {
//   if (err) {
//     console.log('error:', err);
//   } else {
//     for (var i = 0; i < games.length; i++) {
//       if (games[i].deathCoordinates.length > 0) {
//         let rows = Math.floor(games[i].deathCoordinates[0] / 3);
//         let cols = Math.floor(games[i].deathCoordinates[1] / 3);
//         games[i].deathCoordinates = [rows, cols];
//         console.log('deathCoordinates:', games[i].deathCoordinates);
//         games[i].save((err, results) => {
//           if (err) {
//             console.log('error on game save');
//           } else {
//             console.log('game saved');
//           }
//         })
//       }
//     }
//   }
// })

// const s4Start = new Date('May 1, 2018').getTime();
// const s5Start = new Date('July 12, 2018').getTime();
// const s6Start = new Date('September 25, 2018').getTime();

// const getCurrentSeason = (date) => {
//   console.log('date:', date);
//   console.log('date getTime:', date.getTime());
//   if (date.getTime() < s4Start) {
//     return 3;
//   } else if (date.getTime() < s5Start) {
//     return 4;
//   } else if (date.getTime() < s6Start) {
//     return 5;
//   } else if (date.getTime() >= s6Start) {
//     return 6;
//   }
// }


// Game.find({}, null, null, (err, games) => {
//   if (err) {
//     console.log('error:', err);
//   } else {
//     for (var i = 0; i < games.length; i++) {
//       if (!games[i].season) {
//         games[i].season = getCurrentSeason(games[i].date);
//         games[i].save((err, results) => {
//           if (err) {
//             console.log('error on game save');
//           } else {
//             console.log('game saved');
//           }
//         })
//       }
//     }
//   }
// })
