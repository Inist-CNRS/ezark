/*jshint node:true, laxcomma:true*/
'use strict';

module.exports = function(config, start) {
  config.set('theme', __dirname);
  start();
};

if (!module.parent) {
  // eslint-disable-next-line global-require
  require('castor-core')(module.exports);
}
