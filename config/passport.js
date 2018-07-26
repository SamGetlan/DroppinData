const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db/models');

module.exports = function configurePassport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      process.nextTick(() => {
        console.log('inside local-signup');
        User.findOne({ username }, (err, user) => {
          if (err) { return done(err); }
          if (user) {
            console.log('Sorry, that username is already taken');
            return done(null, false, { message: 'That username is already taken' });
          }
          let email = req.body.emailAddress;
          User.findOne({ email }, (err, user) => {
            if (err) { return done(err); }
            if (user) {
              console.log('Sorry, that email is already taken');
              return done(null, false, { message: 'That email is already taken' });
            }
            const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.createdAt = req.body.createdAt;
            newUser.email = req.body.emailAddress.toLowerCase();
            newUser.settings = {
              colorBlind: false,
              stormBackground: true,
              locationTracking: 'name',
              canvasArrowColor: 'red',
            }

            newUser.save((error) => {
              if (error) { throw error; }
              return done(null, newUser);
            });
          }) 
        });
      });
    },
  ));

  passport.use('local-login', new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log('No user with that username');
          return done(null, false, 'No user with that username found');
        }
        if (!user.validPassword(password)) {
          console.log('Whoops! Wrong password');
          return done(null, false, 'Whoops! Wrong password');
        }
        return done(null, user);
      });
    },
  ));
};
