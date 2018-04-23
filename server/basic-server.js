// dependencies
const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();
module.exports.app = app;

app.set('port', (process.env.PORT || 3000));

require('../config/passport')(passport);

// logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded());
app.use(session({ secret: 'Where we Droppin' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./routes.js')(app, passport);


app.use(express.static(`${__dirname}/../client/dist`));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

