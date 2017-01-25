require('app-module-path').addPath(__dirname);

const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browserslist = require('browserslist');
const merge = require('webpack-merge');
const webpack = require('webpack');

const config = require('./config/app.js');
const ASSETS_PATH = config.assets.path;
const TARGET = process.env.npm_lifecycle_event;

const WEBPACK_DEV_URL = `http://${config.webpack.host}:${config.webpack.port}`;

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  `sass-loader?sourceMap`,
];

const browsersListConfig = {
  browsers: 'last 2 versions,iOS >= 8,Safari >= 8',
}
process.env.BROWSERSLIST = browsersListConfig.browsers;

const common = {
  entry: {
    main: "app/client.jsx",
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file?name=public/fonts/[name].[ext]'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loaders: [
        'url'
      ]
    }],
  },
  postcss: [
    autoprefixer(browsersListConfig),
  ],
  progress: true,
  resolve: {
    root: [
      process.cwd(),
    ],
  },
};
if(TARGET === 'dev') {
  module.exports = merge.smart(common, {
    cache: true,
    devTool: 'inline-source-map',
    entry: [
      `webpack-dev-server/client?${WEBPACK_DEV_URL}`,
      'webpack/hot/only-dev-server',
      config.assets.entryScript,
    ],
    module: {
      loaders: [{
        test: /\.js.?$/,
        include: /app/,
        loaders: ['babel-loader'],
      }, {
        test: /\.scss$/,
        loader: `style-loader!${sassLoaders.join('!')}`,
      }],

    },
    output: {
      filename: '[name].js',
      path: process.cwd(),
      publicPath: `${WEBPACK_DEV_URL}${ASSETS_PATH}`,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  });
} else {
  module.exports = merge.smart(common, {
    entry: ['babel-polyfill', config.assets.entryScript],
    devTool: 'source-map',
    module: {
      loaders: [{
        test: /\.js.?$/,
        include: ./app/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      }],
    },
    output: {
      filename: '[name]-[hash].js',
      path: config.assets.compilePath,
    },
    plugins: [
      new AssetsPlugin({
        filename: 'asset-manifest.json',
        path: 'public',
        prettyPrint: true,
      }),
      new ExtractTextPlugin('[name]-[hash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        mangle: false,
      }),
    ],
  });
}
