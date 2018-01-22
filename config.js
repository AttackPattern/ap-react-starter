import crypto from 'crypto';
import fs from 'fs';

let precedence = process.env['Configuration.Precedence'] || process.env.precedence;
const aspects = [null].concat(precedence ? precedence.split('|') : []);

function tryRequire(module) {
  try {
    return require(module);
  }
  catch (e) {}
}

function getSettings(settings) {
  return aspects.reduce((result, aspect) => ({
    ...result,
    ...tryRequire('./.config/' + (aspect ? (aspect + '/') : '') + settings)
  }), {});
}

function decrypt(cypherText) {
  return crypto.privateDecrypt(fs.readFileSync('./.config/keys/key.pem'), Buffer.from(cypherText, 'base64')).toString();
}

export default Object.assign(getSettings, {
  decrypt: value => decrypt(value)
});
