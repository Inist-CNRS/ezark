'use strict'
// to allow mongodb host and port injection thanks
// to the MONGODB_PORT environment parameter
// (docker uses it)
var mongoHostPort = process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace('tcp://', '') : 'localhost:27017';

module.exports = {
  "connectionURI": 'mongodb://' + mongoHostPort + '/ezark',
  "collectionName": "data",
  "browserifyModules" : [
    "qs", 
    "mongodb-querystring",
    "heartbeats",
    "async", 
    "vue", 
    "vue-resource", 
    "components/metrics",
    "components/modal-generate",
    "components/form-resolve",
  ],
  "rootURL" : "index.html",
  "loaders": [
    {
      "script": "castor-load-json",
      "pattern": "**/*.json"
    },
    {
      "script": "range.js",
      "pattern": "**/*.json"
    }
  ],
  "routes": [
    "echo.js",
    "generator.js",
    "resolver.js",
    "table.js"
  ],
  "flyingFields": {
    "$ark": {
      "label" : "ARK",
      "scheme" : "http://purl.org/dc/elements/1.1/identifier",
      "get": "ark"
    },
    "$range": {
      "label" : "Sous autorité",
      "get": "_wid",
      "truncate": 2
    },
    "$batchID": {
      "label" : "N° lot",
      "get": "bundle"
    }
  }
};
module.exports.package = require('./package.json');
