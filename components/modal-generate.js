=G'use strict';
var async = require('async');
var CSV = require('csv-string');
var qs = require('qs');
var heart = require('heartbeats').createHeart(100);
module.exports = new Vue({
  el: '#metrics',
  ready: function() {
    var self = this;
    self.$http.get(window.location.protocol + '//' + window.location.host + '/index/*').then(function (response) {
      var ranges = response.data
      this.$set('countRanges', ranges.length);
      async.map(ranges.map(function(item) {
        return item['@id'] + '/$count';
      }), function(url, callback) {
        self.$http.get(url).then(function (response) {
          callback(null, Number(response.data[0].value));
        }, function() {
          callback(null, 0);
        });
      }, function(err, results) {
        self.$set('countIdentifiers', results.reduce(function(pv, cv) { return pv + cv; }, 0));
      });

      async.map(ranges.map(function(item) {
        return item['@id'] + '/$distinct?field=bundle';
      }), function(url, callback) {
        self.$http.get(url).then(function (response) {
          callback(null, Number(response.data.length));
        }, function() {
          callback(null, 0);
        });
      }, function(err, results) {
        self.$set('countBundles', results.reduce(function(pv, cv) { return pv + cv; }, 0));
      });
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
          $('#modal-generate-spinner').show();
          view1.set('generate', false);
          view1.set('label', String("0").concat('%'));
          var formData = {
            range: view1.get('range'),
            size : Number(view1.get('size'))
          }
          var url = document.location.protocol + '//' + document.location.host + '/' + formData.range;
          $.ajax({
              type: "POST",
              url: "/-/generator",
              data: formData
          })
          .done(function(data) {
              var where = CSV.stringify(["bundle", "=", data], ' ');
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
                        view1.set('generate', true);
                        view1.set('label', "Generate");
                        view1.set('size', 0);
                        $('#modal-generate-spinner').hide();
                      }
                  })
              });
          })
          .fail(function( jqXHR, textStatus ) {
              $('#modal-generate').modal('toggle');
              view1.set('generate', true);
              $('#modal-generate-spinner').hide();
          });
          return false;
        }
  }
})
