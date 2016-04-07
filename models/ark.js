
/*jshint node:true, laxcomma:true */
'use strict';

var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:models:' + basename)
  , ARK = require('../helpers/ark.js')
  ;

 module.exports = function(model) {
  model
  .declare('ark', function(req, fill) {
      var Errors = req.config.get('Errors');
      var identifier = new ARK(req.config.get('NAAN'));
      fill(identifier.parse('ark:/' + req.ark.naan + '/' + req.ark.name));
  })
  .prepend('collectionName', function(req, fill) {
      fill(this.ark.range);
  })
  .append('range', function(req, fill) {
      var q = {
        _wid: this.collectionName
      };
      this.mongoDatabaseHandle.collectionsIndex().findOne(q).then(function(doc) {
          if (doc === null && req.routeParams.resourceName !== 'index') {
            fill(new Error('Range unknown.'));
          }
          else {
            fill(doc);
          }
      }).catch(fill);
  })
  .append('target', function(req, fill) {
      var q = {
        ark: this.ark.value
      };
      this.mongoDatabaseHandle.collection(this.collectionName).findOne(q).then(function(doc) {
          if (doc === null && req.routeParams.resourceName !== 'index') {
            fill(new Error('Ark unknown.'));
          }
          else {
            fill(doc);
          }
      }).catch(fill);
  })
  .send(function(res, next) {
    var self = this;
    res.send(self.range._content.json.target + '/' + self.target.ark)
  })

  return model;
}



