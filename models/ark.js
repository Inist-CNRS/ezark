
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
      if (req.config.get('NAAN') != Number(req.ark.naan)) {
        throw new Error('Unknow NAAN');
      }
      fill({
        value : 'ark:/' + req.ark.naan + '/' + req.ark.name,
        naan: req.ark.naan,
        name: req.ark.name,
        subpub: req.ark.name.substring(0, 4),
        identifier: req.ark.name.substring(5)
      })
    })
  .prepend('collectionName', function(req, fill) {
      fill(this.ark.subpub);
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
        _wid: this.ark.name
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
    res.send(self.range._content.json.target + '/' + self.target._content.json.ark)
  })

  return model;
}



