// dependencies
const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const config = require('./config.js');

const app = express();
module.exports.app = app;

app.set('port', (process.env.PORT || 8081));

require('../config/passport')(passport);

// logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded());
app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./routes.js')(app, passport);


app.use(express.static(`${__dirname}/../client/dist`));

app.get('/stats/0.bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../client/dist`, `0.bundle.js`));
})

app.get('/stats/1.bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../client/dist`, `1.bundle.js`));
})

app.get(`*`, function(req, res) {
  res.sendFile(path.resolve(__dirname, `../client/dist`, `index.html`));
});

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
