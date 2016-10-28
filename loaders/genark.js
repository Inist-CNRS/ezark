'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:loaders:' + basename)
  , clone = require('clone')
  , loop = require('serial-loop')
  , URL = require('url')
  , MQS = require('mongodb-querystring')
  , ARK = require('inist-ark')
  ;


module.exports = function(options, config) {
  options = options || {};
  var identifier = new ARK(options.naan, String(options.range).toLocaleLowerCase());

  return function (input, submit, cf) {
    var concurrency = cf.concurrency || 1
      , delay       = cf.delay || 100
      , loc         = URL.parse(input.location, true)
      , params      = MQS.parse(loc.search.slice(1))
      , bundle      = params.bundle || Date.now()
      , arkopt      = {
          naan         : params.naan || '',
          subpublisher : params.subpub.toLocaleUpperCase()  || ''
        }
      , size        = Number(params.size || 1)
      ;
    if (Number.isNaN(size) || size < 1) {
      return submit(new Error('Size is not valid'), null);
    }
    if (arkopt.subpublisher === '') {
      return submit(new Error('Sub publisher is not valid'), null);
    }
    if (arkopt.naan === '') {
      return submit(new Error('NAAN is not valid'), null);
    }
    var idt = new ARK(arkopt)
    loop(size, function each (next, i) {
      var doc = clone(input, false);
      var ark = idt.generate();
      doc.wid = ark.slice(11);
      doc.content = {
        json : {
          bundle : bundle,
          ark: ark
        }
      };
      var qe = submit(doc);
      if (qe.length() >= concurrency) {
        setTimeout(function () {
          next();
        }, delay);
      }
      else {
        next();
      }
    }, submit);
  };
};
