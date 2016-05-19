/* global $,Vue */
'use strict';
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
        var formData = {
          name : self.name,
          subject : self.subject,
          description: self.description,
          target: self.target,
        }
          self.$http.post("/-/addsubpub", formData).then(function(result) {
            $('#modal-addsubpub').modal('toggle');
            self.$set('generate', true);
            self.$set('label', "Generate");
            $('#modal-addsubpub-spinner').hide();
            self.$http.get(result.headers('location')).then(function(result) {
              window.location.href = document.location.protocol + '/index/' + result.data[0].subpub + '/*';
            }, console.error);
          }, function(e) {
            $('#modal-addsubpub').modal('toggle');
            this.$set('generate', true);
            $('#modal-addsubpub-spinner').hide();
          });
       }
    }
  }
})
