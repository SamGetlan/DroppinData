const db = require('../db/connection.js');

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
    // load games of user on login
    db.loadGames(req.user.username, (results) => {
      res.send(JSON.stringify(results));
    });
  });

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

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
