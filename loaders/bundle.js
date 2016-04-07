'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:loaders:' + basename)
  , clone = require('clone')
  , loop = require('serial-loop')
  , ARK = require('../helpers/ark.js')
  ;


module.exports = function(options) {
  options = options || {};
  options.size = Number(options.size || 1);
  var identfifer = new ARK(options.naan, String(options.range).toLocaleLowerCase());

  return function (input, submit, conf) {
    var concurrency = conf.concurrency || 1
      , delay       = conf.delay || 100
      ;
    if (Number.isNaN(options.size) || options.size < 1) {
      return submit(new Error('Size is not valid'), null);
    }
   loop(options.size, function each (next, i) {
       var doc = clone(input, false);
       doc.ark = identfifer.stringify(input.fid, i);
       doc._wid = doc.ark.slice(12);
       doc.bundle = doc.filename.replace(doc.directory, '').replace(doc.extension, '').slice(1, -1);
       var qe = submit(doc);
       if (qe.length() >= concurrency) {
         setTimeout(function () {
             next();
         }, delay)
       }
       else {
         next();
       }
   }, submit);
 }
}
