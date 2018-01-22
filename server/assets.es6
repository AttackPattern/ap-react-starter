const express = require('express');

module.exports = (app, appConfig) => {
  const ASSETS_PATH = appConfig.assets.path;
  const COMPILED_ASSETS = appConfig.assets.compilePath;
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
      const manifest = require(`../${COMPILED_ASSETS}/${appConfig.assets.manifest}`);

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
    if (TARGET === 'dev') {
      const host = appConfig.webpack.host;
      const port = appConfig.webpack.port;

      return `//${host}:${port}${ASSETS_PATH}/${name}.${ext}`;
    } else {
      return asset(name, ext);
    }
  }


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
