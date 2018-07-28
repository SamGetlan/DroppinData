const db = require('../db/connection.js');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const sendGrid = require('./config.js');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('user is not authenticated');
  res.statusCode = 401;
  res.end();
};

module.exports = (app, passport) => {
  app.post('/api/games', isLoggedIn, (req, res) => {
    db.saveGame(req.body, (postedGame) => {
      db.loadGames(postedGame.user, (results) => {
        res.send(JSON.stringify(results));
      });
    });
  });

  app.get('/api/games', isLoggedIn, (req, res) => {
    db.loadGames(req.user.username, (results) => {
      res.send(JSON.stringify(results));
    });
  });

  app.put('/api/games/:id', isLoggedIn, (req, res) => {
    db.updateGame(req.params.id, req.body, (err, result) => {
      if (err) {
        console.log('There was an error updating game:', err);
      } else {
        res.json(result);
      }
    })
  });

  app.delete('/api/games', isLoggedIn, (req, res) => {
    //delete selectedGame
    db.deleteGame(req.body.gameId, (err, game) => {
      if (err) {
        console.log('There was an error inside deleteGame:', err);
      } else {
        res.send(JSON.stringify(game));
      }
    })
  })

  app.post('/api/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true,
    }),
  );

  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json(info) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post('/api/checkUsername', (req, res) => {
    db.checkUsername(req.body.username, (result) => {
      res.send(JSON.stringify(result));
    });
  });

  app.post('/api/checkEmail', (req, res) => {
    db.checkEmail(req.body.email, (err, user) => {
      res.send(JSON.stringify(user));
    });
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/forgot', (req, res, next) => {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          let token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        db.checkEmail(req.body.email, (err, user) => {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/accountRecovery');
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save((err) => {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        let smtpTransport = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: sendGrid.username,
            pass: sendGrid.password,
          }
        });
        let mailOptions = {
          to: user.email,
          from: 'DroppinData@gmail.com',
          subject: 'DroppinData Account Recovery',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n' + 
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 
            'https://' + req.headers.host + '/reset/' + token + '\n\n' + 
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, (err) => {
          if (err) {
            console.log('error sendingMail:', err)
          } else {
            req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          }
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.json('email sent');;
    });
  });

  app.post('/api/resetPassword', (req, res, next) => {
    async.waterfall([
      function(done) {
        db.checkToken(req.body.token, (err, user) => {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            console.log('Password reset token is invalid or has expired.');
            return res.redirect('/reset');
          }
          user.password = user.generateHash(req.body.password);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          
          user.save((err) => {
            done(err, user);
          });
        });
      },
      function(user, done) {
        let smtpTransport = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: sendGrid.username,
            pass: sendGrid.password,
          }
        });
        let mailOptions = {
          to: user.email,
          from: 'DroppinData@gmail.com',
          subject: 'DroppinData successful password reset',
          text: 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n',
        };
        smtpTransport.sendMail(mailOptions, (err) => {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], (err) => {
      res.json('password changed');
    });
  });

  app.post('/api/applySettings', isLoggedIn, (req, res) => {
    db.updateSettings(req.user.username, { settings: req.body }, (err, user) => {
      res.json(user);
    })
  });

};
