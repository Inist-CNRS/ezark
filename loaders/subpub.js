'use strict';

var alphabet = 'ybcdfghjklmnpqrstvwxz';
var basek = require('basek');

basek.alphaSet(alphabet)

// Random integer between min (inclusive) and max (exclusive)
var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = function(options) {
  options = options || {};
  return function (input, submit) {
    var nid = randomInt(0, alphabet.length * alphabet.length * alphabet.length * alphabet.length) + 1
    input._wid = basek.toBase(nid).pad(4).get();
    submit(null, input);
  }
}

