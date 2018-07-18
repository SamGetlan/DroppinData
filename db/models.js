const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
  settings: {
    colorBlind: Boolean,
    stormBackground: Boolean,
    locationTracking: String,
  },
  createdAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
}; // <-- Why doesn't arrow function work here  --- Scope it is defined in!

const gameSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  locationTracking: {
    type: String,
  },
  date: Date,
  season: Number,
  location: {
    type: String,
    required: true,
  },
  startCoordinates: {
    type: [Number],
    required: true,
  },
  place: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  kills: {
    type: Number,
    min: 0,
    max: 99,
    required: true,
  },
  loot: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  gameType: {
    type: String,
    required: true,
  },
  deathLocation: {
    type: String,
  },
  deathCoordinates: {
    type: [Number],
  },
  stormDeath: {
    type: Boolean,
  },
});

const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);


module.exports.User = User;
module.exports.Game = Game;
