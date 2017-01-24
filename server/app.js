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

const http = require('http');
http.globalAgent.maxSockets = 500;

var app;
module.exports = app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(compression());
app.set('views', `${process.cwd()}/app`);
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ transformViews: false }));

require('./assets.js')(app);
require('./routes')(app);
app.locals.environment = 'production';

app.listen(8080, function() {
  /*eslint-disable */
  console.log(`ap-react-gulp is now running`);
  console.timeEnd('start time');
  /*eslint-enable */
});
