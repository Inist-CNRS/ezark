'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:loaders:' + basename)
  , clone = require('clone')
  , farmhash = require('farmhash')
  , checkdigit = require('checkdigit')
  , loop = require('serial-loop')
  , pad = require('pad')
  ;


module.exports = function(options) {
  options = options || {};
  options.naan = options.naan || undefined;
  options.range = Number(options.range.replace('R', '') || 0);
  options.size = Number(options.size || 1);
  options.pad = "0000000000000";
  return function (input, submit, conf) {
    var concurrency = conf.concurrency || 1
      , delay       = conf.delay || 100
      ;
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
   loop(options.size, function each (next, i) {
       var rag = String(options.range);
       rag = pad(2, rag, '0');
       var doc = clone(input, false);
       var hash = farmhash.hash32WithSeed(input.fid, i)
       hash = pad(10, hash, '0');
       var id = rag.concat(hash);
       var vid = checkdigit.mod10.apply(id);
       vid = pad(13, vid, '0')

       doc._wid = vid;
       doc.ark = 'ark:/' + options.naan + '/' + vid;
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
