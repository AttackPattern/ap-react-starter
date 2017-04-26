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
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [autoprefixer(browsersListConfig)]
      }
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    }
  },
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
    rules: [{
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]',
          },
        }
      ]
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
    extension: ['.js', '.jsx'],
  },
};
if(TARGET === 'dev') {
  module.exports = merge.smart(common, {
    cache: true,
    devtool: 'inline-source-map',
    entry: {
      app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?${WEBPACK_DEV_URL}`,
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      config.assets.entryScript,
      ],
    },
    target: 'node',
    module: {
      rules: [{
        test: /\.js.?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [
              ["env", {
                "modules": true,
              }]
            ],
            "plugins": ["react-hot-loader/babel", "transform-decorators-legacy"]
          }
        }],
      }, {
        test: /\.scss$/,
        use: sassLoaders,
      }],

    },
    output: {
      filename: '[name].js',
      path: process.cwd(),
      publicPath: `${WEBPACK_DEV_URL}${ASSETS_PATH}`,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
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
    module: {
      rules: [{
        test: /\.js.?$/,
        include: /app/,
        use: ['babel-loader'],
      }, {
        test: /\.scss$/,
        use:[{loader: 'style-loader'}].concat(sassLoaders),
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
  });
}
