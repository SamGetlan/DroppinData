const mongoose = require('mongoose');
const config = require('./config.js');
const { Game, User } = require('./models.js');

mongoose.connect(`mongodb://${config.username}:${config.password}@ds119585.mlab.com:19585/droppin_data`);

mongoose.connection.once('open', () => {
  console.log('Connection has been made, now make fireworks...');
}).on('error', (error) => {
  console.log('Connection error:', error);
});

const checkGamePlayed = (gamePlayed) => {
  gamePlayed.place = Number(gamePlayed.place);
  gamePlayed.kills = Number(gamePlayed.kills);
  gamePlayed.loot = Number(gamePlayed.loot);
  return (typeof gamePlayed.user === 'string' && typeof gamePlayed.location === 'string' && typeof gamePlayed.place === 'number' && gamePlayed.place > 0 && gamePlayed.place < 101 && typeof gamePlayed.kills === 'number' && gamePlayed.kills >= 0 && gamePlayed.kills < 100 && typeof gamePlayed.loot === 'number' && gamePlayed.loot > 0 && gamePlayed.loot <= 10 && (gamePlayed.gameType === 'solo' || gamePlayed.gameType === 'duo' || gamePlayed.gameType === 'squad'));
}

const saveGame = (gamePlayed, callback) => {
  if (checkGamePlayed(gamePlayed)) {
    console.log('gamePlayed.stormDeath:', gamePlayed.stormDeath);
    const game = new Game({
      user: gamePlayed.user,
      locationTracking: gamePlayed.locationTracking,
      date: new Date(),
      location: gamePlayed.location,
      startCoordinates: gamePlayed.startCoordinates,
      place: gamePlayed.place,
      kills: gamePlayed.kills,
      loot: gamePlayed.loot,
      gameType: gamePlayed.gameType,
      deathLocation: gamePlayed.death,
      stormDeath: gamePlayed.stormDeath,
      deathCoordinates: gamePlayed.deathCoordinates,
    });
    game.save((err, results) => {
      if (err) {
        console.log('There was an error:', err);
      } else {
        callback(results);
      }
    });
  } else {
    callback(gamePlayed);
  }
};

const loadGames = (user, callback) => {
  Game.find({ user }, null, {sort: '-date'}, (err, games) => {
    if (err) {
      console.log('There has been an error:', err);
    } else {
      callback(games);
    }
  });
};

const checkUsername = (username, callback) => {
  User.findOne({ username }, (err, result) => {
    if (err) {
      console.log('There was an error:', err);
    } else {
      callback(result);
    }
  });
};

const checkEmail = (email, callback) => {
  User.findOne({ email }, (err, result) => {
    if (err) {
      console.log('There was an error in checkEmail:', err);
    } else {
      callback(err, result);
    }
  });
};

const checkToken = (token, callback) => {
  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, result) => {
    if (err) {
      console.log('There was an error inside checkToken:', err);
    } else {
      callback(err, result);
    }
  });
};

const updateSettings = (username, update, callback) => {
  User.findOneAndUpdate({ username }, update, { new: true }, (err, user) => {
    if (err) {
      console.log('There was an error inside updateSettings:', err);
    } else {
      callback(err, user);
    }
  });
}

const updateGame = (gameId, update, callback) => {
  console.log('inside updateGame with gameId:', gameId);
  Game.findByIdAndUpdate(gameId, update, { new: true }, (err, result) => {
    if (err) {
      console.log('There was an error inside updateGame:', err);
    } else {
      callback(err, result);
    }
  });
}

const deleteGame = (gameId, callback) => {
  Game.findByIdAndRemove(gameId, (err, game) => {
    if (err) {
      console.log('There was an error inside deleteGame:', err);
    } else {
      callback(err, game);
    }
  });
}

module.exports.saveGame = saveGame;
module.exports.loadGames = loadGames;
module.exports.checkUsername = checkUsername;
module.exports.checkEmail = checkEmail;
module.exports.checkToken = checkToken;
module.exports.updateSettings = updateSettings;
module.exports.deleteGame = deleteGame;
module.exports.updateGame = updateGame;