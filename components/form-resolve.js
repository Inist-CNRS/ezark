/* eslint no-console: "off" */
'use strict';
var Vue = require('vue');

module.exports = new Vue({
  el: '#form-resolve',
  data: {
    name: '',
    naan: '?'
  },
  ready: function() {
    var self = this;
    self.$http.get(window.location.protocol + '//' + window.location.host + '/-/config.json').then(function (response) {
      self.$set('naan', response.data.NAAN);
    }, console.error);
  },
  methods: {
    handleResolve : function(event) {
      console.log(document.location.protocol + '//' + document.location.host + '/' + $("#form-resolve-addon-ark").text() + this.name);
      window.location.href = document.location.protocol + '//' + document.location.host + '/' + $("#form-resolve-addon-ark").text() + this.name;
      return false;
    }
  }
});
