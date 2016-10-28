'use strict';

var URL = require('url');

module.exports = function(options) {
  options = options || {};
  options.alphabet = options.alphabet || '0123456789BCDFGHJKLMNPQRSTVWXZ';
  return function (input, submit) {
    var loc = URL.parse(input.location, true);
    var uid = '';
    for (var i = 0; i < 3; i++) {
      uid += options.alphabet[Math.floor(Math.random() * options.alphabet.length)];
    }
    input.content = {
      json : loc.query
    };
    input.content.json.uid = uid;
    input.wid = uid;
    submit(null, input);
  };
};

