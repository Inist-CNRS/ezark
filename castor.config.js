'use strict';

module.exports = {
  'rootURL' : 'index.html',
  'mimeTypes' : {
    'application/json' : [
      'json',
      'jsonld',
      'raw',
      'dry',
      'min'
    ]
  },
  'acceptFileTypes': [
    'csv',
    'xml',
    'txt',
    'xls',
    'xlsx',
    'json'
  ],
  'allowedAltValues' : [
    'dry',
    'min',
    'csv',
    'xls',
    'tsv',
    'raw'
  ],
  'loaders': [
    {
      'require': 'subpub.js',
      'pattern' : '**/*.sp'
    },
    {
      'require': 'genark.js',
      'pattern' : '**/*.ark'
    }
  ],
  'routes': [
    'config.js',
    'echo.js',
    'status.js',
    'resolver.js',
    'rest-crud.js'
  ],
  'uniqueValueWith' :  {
    'get': ['_content.json.name', '_content.json.subject'],
    'join' : '/',
    'default' : 'n/a'
  },
  "documentFields": {
    "ark": {
      "title" : "Archive Resource Key",
      "scheme" : "http://purl.org/dc/elements/1.1/identifier",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get": "_content.json.ark"
      }
    },
    "url": {
      "title" : "Resource URL",
      "scheme" : "http://purl.org/dc/terms/URI",
      "type": "https://www.w3.org/TR/xmlschema-2/#anyURI",
      "content<" : {
        "get" : ["_collection._content.json.target", "_content.json.ark"],
        "join": "/"
      }
    },
    "batchID": {
      "title" : "Batch ID",
      "scheme" : "http://purl.org/dc/elements/1.1/source",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get": "_content.json.bundle"
      }
    }
  },
  "collectionFields" : {
    "subpub" : {
      "title" : "Sub publisher prefix",
      "scheme" : "http://purl.org/dc/terms/isPartOf",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : "_collection._wid"
      }
    },
    "title" : {
      "title" : "Title",
      "scheme" : "http://purl.org/dc/elements/1.1/title",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : [
          "_collection._content.json.name",
          "_collection._content.json.subject"
        ],
        'join' : '/'
      }
    },
    "description" : {
      "title" : "Description",
      "scheme" : "http://purl.org/dc/terms/description",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : "_collection._content.json.description"
      }
    },
    "target" : {
      "title" : "Application URL",
      "scheme" : "http://purl.org/dc/terms/provenance",
      "type": "https://www.w3.org/TR/xmlschema-2/#anyURI",
      "content<" : {
        "get" : "_collection._content.json.target"
      }
    }
  },
  "datasetFields" : {
    "naan" : {
      "title" : "Publisher prefix",
      "scheme" : "http://purl.org/dc/elements/1.1/identifier",
      "type": "https://www.w3.org/TR/xmlschema-2/#string",
      "content<" : {
        "get" : "_config.NAAN"
      }
    }
  }

};
module.exports.package = require('./package.json');
