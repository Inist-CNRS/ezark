'use strict';
var mqs = require('mongodb-querystring');
module.exports = new Vue({
  el: '#modal-addsubpub',
  ready: function() {
    var self = this;
    console.log('ready', self.label, self.description)
  },
  data: {
    title: "",
    description: "",
    target: "",
    label: "Generate",
    generate: true
  },
  methods : {
    handleGenerate : function(event) {
      var self = this;
      $('#modal-generate-spinner').show();
      self.$set('generate', false);
      self.$set('label', String("0").concat('%'));
      var formData = {
      }
      var url = document.location.protocol + '//' + document.location.host + '/' + formData.range;
      self.$http.post("/-/generator", formData).then(function(result) {
        $('#modal-generate').modal('toggle');
        self.$set('generate', true);
        self.$set('label', "Generate");
        self.$set('size', 0);
      }, function(e) {
        $('#modal-generate').modal('toggle');
        this.$set('generate', true);
        $('#modal-generate-spinner').hide();
      });
    }
  }
})
