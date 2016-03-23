'use strict';
new Vue({
  el: '#form-resolve',
  data: {
    name: ""
  },
  methods: {
    handleResolve : function(event) {
      console.log(document.location.protocol + '//' + document.location.host + '/' + $("#form-resolve-addon-ark").text() + view4.get('name'));
      window.location.href = document.location.protocol + '//' + document.location.host + '/' + $("#form-resolve-addon-ark").text() + view4.get('name');
      return false;
    }
  }
})
