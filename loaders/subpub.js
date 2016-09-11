'use strict';

var basek = require('basek')
  , URL = require('url')
;
var alphabet = '0123456789bcdfghjklmnpqrstvwxz';


// Random integer between min (inclusive) and max (exclusive)
var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = function(options) {
  options = options || {};
  return function (input, submit) {
    var loc = URL.parse(input.location, true)
    var id0 = alphabet.length * alphabet.length * alphabet.length
    var nid = randomInt(0, id0);
    basek.alphaSet(alphabet)
    input._wid = basek.toBase(nid).pad(3).get().toUpperCase();
    input._content = {
      json : loc.query
    }
    submit(null, input);
  }
}

