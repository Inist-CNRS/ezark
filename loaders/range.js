'use strict';

module.exports = function(options) {
  options = options || {};
  return function (input, submit) {
    if (input.content && input.content.json && input.content.json.range) {
      input._name = "range_" + String(input.content.json.range);
    }
    else {
      input._name = "range_0";
    }
    submit(null, input);
  }
}

