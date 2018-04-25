const mongoose = require('mongoose');
const config = require('./config.js');
const { Game, User } = require('./models.js');

mongoose.connect(`mongodb://${config.username}:${config.password}@ds119585.mlab.com:19585/droppin_data`);

mongoose.connection.once('open', () => {
  console.log('Connection has been made, now make fireworks...');
}).on('error', (error) => {
  console.log('Connection error:', error);
});

const saveGame = (gamePlayed, callback) => {
  const game = new Game({
    user: gamePlayed.user,
    date: new Date(),
    location: gamePlayed.location,
    place: gamePlayed.place,
    kills: gamePlayed.kills,
    loot: gamePlayed.loot,
    gameType: gamePlayed.gameType,
  });

  game.save((err, results) => {
    if (err) {
      console.log('There was an error:', err);
    } else {
      callback(results);
    }
  });
};

const loadGames = (user, callback) => {
  console.log('user -->', user);
  Game.find({ user }, null, null, (err, games) => {
    if (err) {
      console.log('There has been an error:', err);
    } else {
      callback(games);
    }
  });
};

const checkUsername = (username, callback) => {
  console.log('username -->', username);
  User.findOne({ username }, (err, result) => {
    if (err) {
      console.log('There was an error:', err);
    } else {
      callback(result);
    }
  });
};

module.exports.saveGame = saveGame;
module.exports.loadGames = loadGames;
module.exports.checkUsername = checkUsername;
