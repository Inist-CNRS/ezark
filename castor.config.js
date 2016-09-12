'use strict'

module.exports = {
 "rootURL" : "index.html",
  "mimeTypes" : {
    "application/json" : [
      'json',
      'jsonld',
      'raw',
      'dry',
      'min'
    ]
  },
  "acceptFileTypes": [
    'csv',
    'xml',
    'txt',
    'xls',
    'xlsx',
    'json'
  ],
  "allowedAltValues" : [
    'dry',
    'min',
    'csv',
    'xls',
    'tsv',
    'raw'
  ],
  "loaders": [
    {
      "require": "subpub.js",
      "pattern" : '**/*.sp'
    },
    {
      "require": "genark.js",
      "pattern" : '**/*.ark'
    }
  ],
  "downloaders": [
    {
      "pattern" : "+(xls|xlsx)",
      "require" : "excel.js"
    }
  ],
  "routes": [
    "config.js",
    "echo.js",
    "status.js",
    "resolver.js",
    "rest-crud.js"
  ],
  "uniqueValueWith" :  {
    "get": ["_content.json.name", "_content.json.name"],
    "join" : "/",
    "default" : "n/a"
  },
  "collectionFields": {
    "ark": {
      "title" : "Archive Resource Key",
      "scheme" : "http://purl.org/dc/terms/URI",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get": "ark"
      }
    },
    "range": {
      "title" : "Sub publisher prefix",
      "scheme" : "http://purl.org/dc/terms/isPartOf",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get": "_table._wid",
        "downcase": true
      }
    },
    "batchID": {
      "title" : "Batch ID",
      "scheme" : "http://purl.org/dc/elements/1.1/source",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get": "bundle"
      }
    }
  },
  "datasetFields" : {
    "subpub" : {
      "title" : "Sub publisher prefix",
      "scheme" : "http://purl.org/dc/elements/1.1/identifier",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : "_wid"
      }
    },
    "title" : {
      "title" : "Title",
      "scheme" : "http://purl.org/dc/elements/1.1/title",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : [
          "_content.json.name",
          "_content.json.subject"
        ],
        "join" : "/"
      }
    },
    "description" : {
      "title" : "Description",
      "scheme" : "http://purl.org/dc/terms/description",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : "_content.json.description"
      }
    },
    "target" : {
      "title" : "Application URL",
      "scheme" : "http://purl.org/dc/terms/provenance",
      "type": "https://www.w3.org/TR/xmlschema-2/#anyURI",
      "content<" : {
        "get" : "_content.json.target"
      }
    }
  }
};
module.exports.package = require('./package.json');
