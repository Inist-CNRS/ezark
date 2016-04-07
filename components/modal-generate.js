'use strict';
var async = require('async');
var heart = require('heartbeats').createHeart(100);
var mqs = require('mongodb-querystring');
module.exports = new Vue({
  el: '#modal-generate',
  ready: function() {
    var self = this;
    self.$http.get(window.location.protocol + '//' + window.location.host + '/data/*').then(function (response) {
      self.$set('ranges', response.data);
    }, console.error);
  },
  data: {
    ranges : [],
    range: "",
    size: 10,
    label: "Generate",
    generate: true,
    token: ""
  },
  methods : {
    handleGenerate : function(event) {
      var self = this;
      $('#modal-generate-spinner').show();
      self.$set('generate', false);
      self.$set('label', String("0").concat('%'));
      var formData = {
        range: self.range,
        size : Number(self.size)
      }
      var url = document.location.protocol + '//' + document.location.host + '/' + formData.range;
      self.$http.post("/-/generator", formData).then(function(result) {
        heart.createEvent(20, {name: 'spin', repeat: 0}, function(heartbeat, last) {
          var qry = {
            "alt" : "raw",
            "$query" : {
              "bundle" : result.data
            }
          }
          self.$http.get(url + '/$count?' + mqs.stringify(qry, {})).then(function(response) {
            self.$set('label', String(Math.round((Number(response.data[0].value) * 100)/formData.size)).concat('%'));
            if (formData.size <= response.data[0].value) {
              window.location.href = document.location.protocol + '//' + document.location.host + '/' + formData.range.toLocaleLowerCase() + '/*?' + mqs.stringify({
                "$query" : {
                  "bundle" : result.data
                },
                "$transform" : {
                  "get" : "ark"
                },
                "alt": "jbj"
              });
              heart.killEvent('spin');
              $('#modal-generate').modal('toggle');
              self.$set('generate', true);
              self.$set('label', "Generate");
              self.$set('size', 0);
              $('#modal-generate-spinner').hide();
            }
          }, function(e) {
            $('#modal-generate').modal('toggle');
            this.$set('generate', true);
            $('#modal-generate-spinner').hide();
          });
          return false;
        })
      }, console.error);
    }
  }
})
