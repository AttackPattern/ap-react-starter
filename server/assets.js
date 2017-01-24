const express = require('express');

const COMPILED_ASSETS = 'public';

/**
 * Generate the url for a static asset file.
 *
 * @param {string} name - asset's filename
 * @param {string} ext - asset's .ext
 * @return {string}
 */
function asset(name, ext) {
  if (process.env.NODE_ENV !== 'development') {
    const manifest = require(`../${COMPILED_ASSETS}/asset-manifest.json`);

    return `/${manifest[name][ext]}`;
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
  return asset(name, ext);
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
