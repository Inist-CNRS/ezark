/*jshint node:true,laxcomma:true*/
'use strict';

var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:routes:' + basename)
  , datamodel = require('datamodel')
  ;

module.exports = function(router, core) {

  var ark = require('../models/ark.js');

  //
  // Define route parameters
  //
  router.param('naan', function(req, res, next, value) {
      if (req.ark === undefined) {
        req.ark  = {};
      }
      req.ark.naan = value;
      next();
  });
  router.param('name', function(req, res, next, value) {
      req.ark.name = value;
      next();
  });

  router
  .route('/ark:/:naan/:name')
  .get(function(req, res, next) {
      if (req.ark.name === undefined || req.ark.naan === undefined) {
        return next();
      }
      datamodel([core.models.mongo, ark])
      .apply(req, res, next);
  })
}
