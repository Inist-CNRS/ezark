/* global $ */
'use strict';
// var async = require('async');
// var heart = require('heartbeats').createHeart(100);
var mqs = require('mongodb-querystring');
var shortid = require('shortid')
var Vue = require('vue');
module.exports = new Vue({
  el: '#modal-generate',
  ready: function() {
    var self = this;
    self.$http.get(window.location.protocol + '//' + window.location.host + '/index/*').then(function (response) {
      self.$set('ranges', response.data);
    }, console.error);

    self.$http.get(window.location.protocol + '//' + window.location.host + '/-/config.json').then(function (response) {
      self.$set('naan', response.data.NAAN);
    }, console.error);

  },
  data: {
    ranges : [],
    range: "",
    naan: "?",
    size: 10,
    label: "Generate",
    generate: true,
    token: ""
  },
  methods : {
    handleGenerate : function(event) {
      var self = this;
      if (self.generate === false) {
        return false;
      }
      $('#modal-generate-spinner').show();
      self.$set('generate', false);

      var queryData = {
        naan : self.naan,
        subpub: self.range.toLocaleLowerCase(),
        size: Number(self.size),
        bundle : shortid.generate()
      }
      var serverHost = window.location.protocol + '//' + window.location.host;
      var url = serverHost + '/' + self.range + '/';
      var formData = {
        // BUG? : see https://trello.com/c/A0oNBnRq
        'url' : 'http://127.0.0.1:3000/-/echo/' + queryData.bundle.concat('.ark') + '?' + mqs.stringify(queryData)
      }
      self.$http.post(url, formData).then(function(result) {
        $('#modal-generate').modal('toggle');
        self.$set('generate', true);
        self.$set('label', "Generate");
        $('#modal-generate-spinner').hide();
        window.location.href = serverHost + result.headers('location') + '&alt=tsv';
      }, console.error);
    }
  }
})
