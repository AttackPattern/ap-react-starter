/**
 * Main application config.
 * These will be directly available to server-side code.
 * Where you need a key in client-side code, also add to webpack.config.js
 *
 * Note: keys are in alphabetical order.
 *
 * @type {Object}
 */
module.exports = Object.freeze({
  app: {
    port: process.env.APP_PORT || '8082'
  },
  assets: {
    path: process.env.ASSETS_PATH || '/public',
    compilePath: 'public',
    entryScript : 'app/client.jsx',
    manifest: 'asset-manifest.json'
  },
  cms: {
    json: process.env.CMS_JSON || 'http://cms.attackpattern.com/json/',
    media: process.env.CMS_MEDIA || 'http://cms.attackpattern.com/files/',
    thumbs: process.env.CMS_THUMBS || 'http://cms.attackpattern.com/thumbs/',
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
    port: process.env.WEBPACK_PORT || '8083'
  }
});
