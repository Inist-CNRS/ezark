'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:loaders:' + basename)
  , clone = require('clone')
  , loop = require('serial-loop')
  , URL = require('url')
  , ARK = require('../helpers/ark.js')
  ;


module.exports = function(options, config) {
  options = options || {};
  var identfifer = new ARK(options.naan, String(options.range).toLocaleLowerCase());

  return function (input, submit, cf) {
    var concurrency = cf.concurrency || 1
      , delay       = cf.delay || 100
      , loc         = URL.parse(input.location, true)
      , bundle      = loc.query.bundle
      , size        = Number(loc.query.size)
      , subpub      = loc.query.subpub || ''
      , naan        = loc.query.naan || ''
      , ark         = new ARK(naan, subpub)
      ;
    debug('size', size);
    debug('subpub', subpub);
    debug('naan', naan);
    debug('loc', loc);
    if (Number.isNaN(options.size) || options.size < 1) {
      return submit(new Error('Size is not valid'), null);
    }
    if (subpub === '') {
      return submit(new Error('Sub publisher is not valid'), null);
    }
    if (naan === '') {
      return submit(new Error('NAAN is not valid'), null);
    }
    loop(size, function each (next, i) {
      var doc = clone(input, false);
      var idt = ark.generate();
      doc._wid = idt.slice(11);
      doc._content = {
        json : {
          bundle : bundle,
          ark: idt
        }
      }
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
