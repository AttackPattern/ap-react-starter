require('app-module-path').addPath(__dirname);
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browserslist = require('browserslist');
const webpack = require('webpack');

const config = require('./config').default('app');
const ASSETS_PATH = config.assets.path;
const TARGET = process.env.npm_lifecycle_event;

const WEBPACK_DEV_URL = `http://${config.webpack.host}:${config.webpack.port}`;
const browsersListConfig = {
  browsers: 'last 2 versions,iOS >= 8,Safari >= 8',
}
const sassLoaders = [
  {loader: 'style-loader'},
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: true
  }},
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: true,
      plugins: loader => [
        autoprefixer(),
      ]
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    }
  },
];

const isDev = TARGET === 'dev';

const entry = {
  dev: [
    config.assets.entryScript,
  ],
  prod: ['babel/polyfill', config.assets.entryScript],
}
const sass = {
  dev: sassLoaders,
  prod: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: sassLoaders.slice(1),
  }),
};
const output = {
  dev: {
    filename: '[name].js',
    path: process.cwd(),
    publicPath: `${WEBPACK_DEV_URL}${ASSETS_PATH}`,
  },
  prod: {
    filename: '[name]-[hash].js',
    path: '/src/public',
  },
};
const plugins = {
  dev: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  prod: [
    new AssetsPlugin({
      filename: 'asset-manifest.json',
      path: config.assets.compilePath,
      prettyPrint: true,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
    }),
  ],
};

module.exports = {
  cache: true,
  devtool: isDev ? 'inline-source-map' : 'nosources-source-map',
  entry: isDev ? entry.dev : entry.prod,
  output: isDev ? output.dev: output.prod,
  target: 'web',
  module: {
    rules: [{
      test: /\.js.?$/,
      include: /app/,
      use: ['babel-loader'],
    }, {
      test: /\.scss$/,
      use: isDev ? sass.dev : sass.prod,
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]',
          },
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '/images/[name].[ext]',
          }
        }
      ]
    }],
  },
  resolve : {
    modules: [
      process.cwd(),
      "node_modules"
    ],
  },
  plugins: isDev ? plugins.dev : plugins.prod,
};
