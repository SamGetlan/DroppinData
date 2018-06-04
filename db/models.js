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
  date: Date,
  location: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    min: 1,
    max: 100,
  },
  kills: {
    type: Number,
    min: 0,
    max: 99,
  },
  loot: {
    type: Number,
    min: 0,
    max: 10,
  },
  gameType: {
    type: String,
    required: true,
  },
  deathLocation: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);


module.exports.User = User;
module.exports.Game = Game;
