'use strict';
/*eslint-disable */
console.time('start time');
/*eslint-enable */

require('babel-register')({
  extensions: ['.js', '.jsx'],
  only: /app/,
});

const express = require('express');
const expressReactViews = require('express-react-views');
const compression = require('compression');
const config = require('../config/app.js');
const path = require('path');
const http = require('http');
http.globalAgent.maxSockets = 500;

var app;
module.exports = app = express();

app.locals.environment = process.env.npm_lifecycle_event === 'dev' ?
  'development' : 'production';

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(compression());
//pathing needs to be different if we are on azure
process.env.hasOwnProperty('OS') && process.env.OS === 'Windows_NT' ?
  app.set('views', path.join(`${process.cwd()}`, '..', 'app')) :
  app.set('views', path.join(`${process.cwd()}`, 'app'));
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ transformViews: false }));

require('./assets.js')(app);
require('./routes')(app);
const port = process.env.PORT || config.app.port;
app.listen(port, function() {
  /*eslint-disable */
  if (app.locals.environment === 'development') {
    require('./webpack');
  }
  console.log(`ap-react is now running`);
  console.timeEnd('start time');
  /*eslint-enable */
});
