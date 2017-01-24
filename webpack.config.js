require('app-module-path').addPath(__dirname);

const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browserslist = require('browserslist');
const merge = require('webpack-merge');
const webpack = require('webpack');

const ASSETS_PATH = process.env.ASSETS_PATH;
const TARGET = process.env.npm_lifecycle_event;

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
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file?name=public/fonts/[name].[ext]'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loaders: [
        'url',
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

module.exports = merge.smart(common, {
  entry: ['babel-polyfill', 'app/client.jsx'],
  devTool: 'source-map',
  module: {
    loaders: [{
      test: /\.js.?$/,
      include: /app/,
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
    }],
  },
  output: {
    filename: '[name]-[hash].js',
    path: 'public',
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
