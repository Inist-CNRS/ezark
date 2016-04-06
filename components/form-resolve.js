'use strict';
var Vue = require('vue');

module.exports = new Vue({
  el: '#form-resolve',
  data: {
    name: ""
  },
  methods: {
    handleResolve : function(event) {
      console.log(document.location.protocol + '//' + document.location.host + '/' + $("#form-resolve-addon-ark").text() + this.name);
      window.location.href = document.location.protocol + '//' + document.location.host + '/' + $("#form-resolve-addon-ark").text() + this.name;
      return false;
    }
  }
})
