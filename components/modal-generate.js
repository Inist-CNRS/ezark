'use strict';
var async = require('async');
var heart = require('heartbeats').createHeart(100);
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
    size: "",
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
        range: view1.get('range'),
        size : Number(view1.get('size'))
      }
      var url = document.location.protocol + '//' + document.location.host + '/' + formData.range;
      self.$http.post("/-/generator", formData, [options]).then(function(data) {
        heart.createEvent(20, {name: 'spin', repeat: 0},function(heartbeat, last){
          oboe(url + '/$count?' + qs.stringify({ where: where}))
          .done(function(results) {
            console.log(url + '/$count?' + qs.stringify({ where: where}), results);
            view1.set('label', String(Math.round((Number(results[0].value) * 100)/formData.size)).concat('%'));
            if (formData.size <= results[0].value) {
              window.location.href = document.location.protocol + '//' + document.location.host + '/' + formData.range + '/*?' + qs.stringify({
                where : where,
                alt: "csv"
              });
              heart.killEvent('spin');
              metrics();
              $('#modal-generate').modal('toggle');
              self.$set('generate', true);
              self.$set('label', "Generate");
              self.$set('size', 0);
              $('#modal-generate-spinner').hide();
            }
          })
        });
      }, function( jqXHR, textStatus ) {
        $('#modal-generate').modal('toggle');
        this.$set('generate', true);
        $('#modal-generate-spinner').hide();
      });
      return false;
    }
  }
})
