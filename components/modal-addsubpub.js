/* global $,Vue */
'use strict';
var Vue = require('vue');
var MQS = require('mongodb-querystring');
module.exports = new Vue({
  el: '#modal-addsubpub',
  data: {
    name: "",
    subject : "",
    description: "",
    target: "",
    label: "Generate",
    generate: true
  },
  methods : {
    handleAddsubpub: function(event) {
      var self = this;
      if (self.generate === true) {
        $('#modal-generate-spinner').show();
        self.$set('generate', false);
        self.$set('label', String("0").concat('%'));
        var queryData = {
          name : self.name,
          subject : self.subject,
          description: self.description,
          target: self.target,
        }
        var serverHost = window.location.protocol + '//' + window.location.host;
        var url = serverHost + '/index/';
        var formData = {
          'url' : serverHost + '/-/echo/' + Date.now().toString().concat('.sp') + '?' + MQS.stringify(queryData)
        }
        self.$http.post(url, formData).then(function (result) {
            $('#modal-addsubpub').modal('toggle');
            self.$set('generate', true);
            self.$set('label', "Generate");
            $('#modal-addsubpub-spinner').hide();
            window.location.href = serverHost + result.headers('location');
          }, function(e) {
            $('#modal-addsubpub').modal('toggle');
            this.$set('generate', true);
            $('#modal-addsubpub-spinner').hide();
          });
        }
      }
    }
  })
