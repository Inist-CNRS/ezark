/*jshint node:true, laxcomma:true */
'use strict';

var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:models:' + basename)
  , MongoClient = require('mongodb').MongoClient
  ;


module.exports = function(model) {
  model
  .declare('mongoDatabaseHandle', function(req, fill) {
      MongoClient.connect(req.config.get('connexionURI')).then(fill).catch(fill);
  })
  .complete('mongoDatabaseHandle', function(req, fill) {
      if (this.mongoDatabaseHandle instanceof Error || this.mongoCursor !== undefined) {
        return fill(this.mongoDatabaseHandle);
      }
      this.mongoDatabaseHandle.close().then(fill).catch(fill);
  })
  return model;
}

