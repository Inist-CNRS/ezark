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
  ]
};
module.exports.package = require('./package.json');
