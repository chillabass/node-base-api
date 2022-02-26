const _defaultsDeep = require('lodash/defaultsDeep');

const defaultConfig = require('./defaultConfig');

const env = process.env.NODE_ENV || 'development';

let localConfig = {};
try {
  localConfig = require('./localConfig');
} catch (err) {
  console.warn('There is no localConfig.json file!!!');
}

const config = _defaultsDeep(localConfig, defaultConfig);

module.exports = config[env];
