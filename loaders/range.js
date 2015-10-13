'use strict';

module.exports = function(options) {
  options = options || {};
  return function (input, submit) {
    if (input.content && input.content.json && input.content.json.range) {
      var str = String(input.content.json.range)
      var pad = "00"
      input._wid = "R" + pad.substring(0, pad.length - str.length) + str
    }
    else {
      input._wid = "R00";
    }
    submit(null, input);
  }
}

