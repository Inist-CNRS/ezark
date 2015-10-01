'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:loaders:' + basename)
  , clone = require('clone')
  , farmhash = require('farmhash')
  , checkdigit = require('checkdigit');

module.exports = function(options) {
  options = options || {};
  options.naan = options.naan || undefined;
  options.range = Number(options.range || 0);
  options.size = Number(options.size || 1);
  return function (input, submit) {
    if (options.naan === undefined) {
      return submit(new Error('NAAN not defined'), null);
    }
    for (var i = 0; i < options.size; i++) {
      var doc = clone(input, false);
      var hash = farmhash.hash32WithSeed(input.fid, i);
      var id = String(options.range).concat(hash);
      var vid = checkdigit.mod10.apply(id);
      doc.ark = 'ark:/' + options.naan + '/' + vid;
      var qe = submit(doc);
    }
    submit();
  }
}
