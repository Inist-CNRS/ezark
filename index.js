module.exports = {
  "browserifyModules" : [ "jquery" ],
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
    "table.js"
  ]
};
module.exports.package = require('./package.json');
