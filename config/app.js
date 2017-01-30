/**
 * Main application config.
 * These will be directly available to server-side code.
 * Where you need a key in client-side code, also add to webpack.config.js
 *
 * NOTE: keys are in alphabetical order.
 *
 * NOTE: using Object.freeze to enforce `constants` in config hash
 *
 * @type {Object}
 */
module.exports = Object.freeze({
  app: {
    port: process.env.APP_PORT || '8080'
  },
  assets: {
    path: process.env.ASSETS_PATH || '/public',
    compilePath: 'public',
    entryScript : 'app/client.jsx',
    manifest: 'asset-manifest.json'
  },
  locale: {
    code: 'en-US',
    language: 'en'
  },
  node: {
    env: process.env.NODE_ENV || 'production'
  },
  npm: {
    lifecycle_event: process.env.npm_lifecycle_event
  },
  webpack: {
    host: process.env.WEBPACK_HOST || 'localhost',
    port: process.env.WEBPACK_PORT || '8081'
  }
});
