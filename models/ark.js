
/*jshint node:true, laxcomma:true */
'use strict';

var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:models:' + basename)
  , checkdigit = require('checkdigit')
  ;

module.exports = function(model) {
  model
  .declare('ark', function(req, fill) {
      var Errors = req.config.get('Errors');

      if (checkdigit.mod10.isValid(req.ark.name) === false) {
        return fill(new Errors.InvalidParameters('Identifier is not valid.'));
      }
      fill( {
          value : 'ark:/' + req.ark.naan + '/' + req.ark.name,
          name: req.ark.name,
          range: req.ark.name.substring(0, 1),
          hash: req.ark.name.substring( 1, -1),
          naan : req.ark.naan
        }
      )
  })
  .prepend('collectionName', function(req, fill) {
      fill('range_' + this.ark.range);
  })
  .append('range', function(req, fill) {
      if (this.mongoCollectionsIndexHandle instanceof Error) {
        return fill();
      }
      var q = {
        _name: this.collectionName
      };
      this.mongoCollectionsIndexHandle.findOne(q).then(function(doc) {
          if (doc === null && req.routeParams.resourceName !== 'index') {
            fill(new Error('Range unknown.'));
          }
          else {
            fill(doc);
          }
      }).catch(fill);
  })
  .append('target', function(req, fill) {
      if (this.mongoDatabaseHandle instanceof Error) {
        return fill();
      }
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
      res.send(self.range.content.json.target + '/' + self.target.ark)
  })

  return model;
}



