const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const config = require('../config').default('app');

const WEBPACK_DEV_URL = `http://${config.webpack.host}:${config.webpack.port}`;
const options = {
  compress: true,
  host: "0.0.0.0",
  port: config.webpack.port,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  hot: true,
  publicPath: `${WEBPACK_DEV_URL}${config.assets.path}`,
  stats: {
    colors: true,
  }
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(config.webpack.port, "0.0.0.0", () => {
  /*eslint-disable */
  console.log(`Webpack Dev Server: PORT=${config.webpack.port}`);
  /*eslint-enable */
});
