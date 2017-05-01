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
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
});

server.listen(config.webpack.port, function(err, result) {
  /*eslint-disable */
  if(err) {
    console.log(`webpack Dev Server error ${err}`);
  }
  console.log(`Webpack Dev Server: PORT=${config.webpack.port}`);
  /*eslint-enable */
});
