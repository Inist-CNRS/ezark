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
    handleAddsubpub: function(event) {
      var self = this;
      $('#modal-generate-spinner').show();
      self.$set('generate', false);
      self.$set('label', String("0").concat('%'));
      var formData = {
        title : self.title,
        description: self.description,
        target: self.target,
      }
      self.$http.post("/-/addsubpub", formData).then(function(result) {
        $('#modal-addsubpub').modal('toggle');
        self.$set('generate', true);
        self.$set('label', "Generate");
        $('#modal-addsubpub-spinner').hide();
        console.log('result', result)
      }, function(e) {
        $('#modal-addsubpub').modal('toggle');
        this.$set('generate', true);
        $('#modal-addsubpub-spinner').hide();
      });
    }
  }
})
