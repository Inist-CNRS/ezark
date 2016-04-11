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
  "defaultColumns": {
    "ark": {
      "label" : "Archive Resource Key",
      "scheme" : "http://purl.org/dc/terms/URI",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get": "ark"
    },
    "range": {
      "label" : "Sub publisher prefix",
      "scheme" : "http://purl.org/dc/terms/isPartOf",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get": "_table._wid",
      "downcase": true
    },
    "batchID": {
      "label" : "Batch ID",
      "scheme" : "http://purl.org/dc/elements/1.1/source",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get": "bundle"
    }
  },
  "indexColumns" : {
    "range" : {
      "label" : "Sub publisher prefix",
      "scheme" : "http://purl.org/dc/elements/1.1/identifier",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get" : "_content.json.range",
      "downcase": true
    },
    "title" : {
      "label" : "Title",
      "scheme" : "http://purl.org/dc/elements/1.1/title",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get" : "_content.json.title"
    },
    "description" : {
      "label" : "Description",
      "scheme" : "http://purl.org/dc/terms/description",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get" : "_content.json.description"
    },
    "target" : {
      "label" : "Application URL",
      "scheme" : "http://purl.org/dc/terms/provenance",
      "type": "https://www.w3.org/TR/xmlschema-2/#anyURI",
      "get" : "_content.json.target"
    }
  },
  'allowedAltValues':     ['csv', 'jsonld', 'jbj', 'xls', 'tsv', 'dry', 'raw']
};
module.exports.package = require('./package.json');
