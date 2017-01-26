const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

const config = require('../config/app.js');

const server = new WebpackDevServer(webpack(webpackConfig), {
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  host: '0.0.0.0',
  hot: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  stats: {
    colors: true,
  },
});

server.listen(config.wepback.port, function() {
  /*eslint-disable */
  console.log(`Webpack: PORT=${config.webpack.port}`);
  /*eslint-enable */
});
