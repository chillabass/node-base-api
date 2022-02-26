const defaultConfig = require('./defaultConfig');
const localConfig = require('./localConfig');

module.exports = { 
  ...defaultConfig,
  ...localConfig
};
