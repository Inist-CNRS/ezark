'use strict'

module.exports = {
  "browserifyModules" : [
    "mongodb-querystring",
    "heartbeats",
    "async",
    "vue",
    "vue-validator",
    "vue-resource",
    "components/metrics",
    "components/modal-generate",
    "components/modal-addsubpub",
    "components/form-resolve",
  ],
  "rootURL" : "index.html",
  "loaders": [
    {
      "script": "subpub.js",
      "pattern" : '**/*.sp'
    },
    {
      "script": "genark.js",
      "pattern" : '**/*.ark'
    }
  ],
  "routes": [
    "echo.js",
    "status.js",
    "generator.js",
    "resolver.js",
    "addsubpub.js",
    "rest-crud.js"
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
    "subpub" : {
      "label" : "Sub publisher prefix",
      "scheme" : "http://purl.org/dc/elements/1.1/identifier",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get" : "_wid"
    },
    "title" : {
      "label" : "Title",
      "scheme" : "http://purl.org/dc/elements/1.1/title",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "get" : [
        "_content.json.name",
        "_content.json.subject"
      ],
      "join" : "/"
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
