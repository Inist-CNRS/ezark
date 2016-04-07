'use strict';
var async = require('async');
module.exports = new Vue({
  el: '#metrics',
  ready: function() {
    var self = this;
    self.$http.get(window.location.protocol + '//' + window.location.host + '/index/*').then(function (response) {
      var ranges = response.data
      this.$set('countRanges', ranges.length);
      async.map(ranges.map(function(item) {
        return item['@id'] + '/$count';
      }), function(url, callback) {
        self.$http.get(url).then(function (response) {
          if (response.data[0]) {
            callback(null, Number(response.data[0].value || 0));
          }
          else {
            callback(null, 0);
          }
        }, function() {
          callback(null, 0);
        });
      }, function(err, results) {
        self.$set('countIdentifiers', results.reduce(function(pv, cv) { return pv + cv; }, 0));
      });

      async.map(ranges.map(function(item) {
        return item['@id'] + '/$distinct?field=bundle';
      }), function(url, callback) {
        self.$http.get(url).then(function (response) {
          callback(null, Number(response.data.length));
        }, function() {
          callback(null, 0);
        });
      }, function(err, results) {
        self.$set('countBundles', results.reduce(function(pv, cv) { return pv + cv; }, 0));
      });
    }, console.error);

  },
  data: {
    countRanges: 0,
    countIdentifiers: 0,
    countBundles: 0
  }
})

