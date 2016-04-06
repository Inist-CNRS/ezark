'use strict';

module.exports = function(options) {
  options = options || {};
  return function (input, submit) {
    if (input.content && input.content.json && input.content.json.range) {
      var str = String(input.content.json.range)
      var pad = "aa"
      input._wid = pad.substring(0, pad.length - str.length).concat(str).toLowerCase().replace(/[^a-z]/g, 'z')
    }
    else {
      input._wid = "aa";
    }
    submit(null, input);
  }
}

