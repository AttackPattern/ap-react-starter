const express = require('express');


const config = require('../config/app.js');
const ASSETS_PATH = config.assets.path;
const COMPILED_ASSETS = config.assets.compilePath;
const TARGET = process.env.npm_lifecycle_event;
/**
 * Generate the url for a static asset file.
 *
 * @param {string} name - asset's filename
 * @param {string} ext - asset's .ext
 * @return {string}
 */
function asset(name, ext) {
  if (TARGET !== 'dev') {
    const manifest = require(`../${COMPILED_ASSETS}/${config.assets.manifest}`);

    return `${ASSETS_PATH}/${manifest[name][ext]}`;
  }
}

/**
 * Generate the url for a webpack asset.
 *
 * @param {string} name - asset's filename
 * @param {string} type - asset's .ext
 * @return {string}
 */
function webpackAsset(name, ext) {
  if (TARGET === 'dev') {
    const host = config.webpack.host;
    const port = config.webpack.port;

    return `//${host}:${port}${ASSETS_PATH}/${name}.${ext}`;
  } else {
    return asset(name, ext);
  }
}

module.exports = (app) => {

  app.use(express.static(COMPILED_ASSETS));
  app.locals.assets = {
    styles: {
      main: asset('main', 'css'),
    },
    scripts: {
      main: webpackAsset('main', 'js'),
    },
  };
};
