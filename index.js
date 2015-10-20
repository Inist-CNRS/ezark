module.exports = {
  "connectionURI": 'mongodb://localhost:27017/ezark/',
  "browserifyModules" : [ "qs", "heartbeats", "async", "jquery", "oboe", "paperclip/lib/node.js", "csv-string" ],
  "rootURL" : "index.html",
  "collectionsIndexName" : "index",
  "collectionName" :       "index",
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
