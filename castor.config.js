'use strict'
// to allow mongodb host and port injection thanks
// to the MONGODB_PORT environment parameter
// (docker uses it)
var mongoHostPort = process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace('tcp://', '') : 'localhost:27017';

module.exports = {
  "connectionURI": 'mongodb://' + mongoHostPort + '/ezark',
  "collectionName": "data",
  "collectionsIndexName" : "data",
  "browserifyModules" : [
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
      "require" : 'castor-load-excel',
      "pattern" : '**/*.xlsx'
    },
    {
      "script": "range.js",
      "pattern" : '**/*.xlsx'
    }
  ],
  "routes": [
    "echo.js",
    "status.js",
    "generator.js",
    "resolver.js",
    "table.js"
  ],
  "publicFields": {
    "$ark": {
      "get": "ark"
    },
    "$range": {
      "get": "_table._wid"
    },
    "$batchID": {
      "get": "bundle"
    },
    "mask" : "ark,range,batchID"
  }
};
module.exports.package = require('./package.json');
