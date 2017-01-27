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

const http = require('http');
http.globalAgent.maxSockets = 500;

var app;
module.exports = app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(compression());
app.set('views', `${process.cwd()}` + '\app');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ transformViews: false }));

require('./assets.js')(app);
require('./routes')(app);
app.locals.environment = process.env.npm_lifecycle_event === 'dev' ?
  'development' : 'production';
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
