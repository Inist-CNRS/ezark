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
  options.range = Number(options.range.replace('range_', '') || 0);
  options.size = Number(options.size || 1);
  options.pad = "0000000000000";
  return function (input, submit) {
    if (options.naan === undefined) {
      return submit(new Error('NAAN not defined'), null);
    }
    if (Number.isNaN(options.range)) {
      return submit(new Error('Range not defined'), null);
    }
    if (options.range < 0 || options.range > 99) {
      return submit(new Error('Range is not valid'), null);
    }
    if (Number.isNaN(options.size) || options.size < 1) {
      return submit(new Error('Size is not valid'), null);
    }
    for (var i = 0; i < options.size; i++) {
      var rag = String(options.range);
      var doc = clone(input, false);
      var hash = farmhash.hash32WithSeed(input.fid, i);
      var id = rag.concat(hash);
      var vid = checkdigit.mod10.apply(id);
      var pid = options.pad.substring(0, options.pad.length - vid.length) + vid
      doc._name = pid;
      doc.ark = 'ark:/' + options.naan + '/' + pid;
      var qe = submit(doc);
    }
    submit();
  }
}
