const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

const config = require('../config/app.js');

const server = new WebpackDevServer(webpack(webpackConfig), {
  compress: true,
  host: "0.0.0.0",
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  hot: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  stats: {
    colors: true,
  },
});

server.listen(config.webpack.port, function() {
  /*eslint-disable */
  console.log(`Webpack: PORT=${config.webpack.port}`);
  /*eslint-enable */
});
