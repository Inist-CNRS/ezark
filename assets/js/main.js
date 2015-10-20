/* global $, document */
'use strict';
$(document).ready(function() {


    var oboe = require('oboe');
    var async = require('async');
    var CSV = require('csv-string');
    var pc = require("paperclip/lib/node.js");
    var qs = require('qs');
    var heart = require('heartbeats').createHeart(100);
    var view = function(id, mdl) {
      var n = document.getElementById(id)
      var t = n.innerHTML.replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
      var v = pc.template(t, pc).view(mdl);
      n.parentNode.insertBefore(v.render(), n);
      return v;
    }

    var view1 = view('modal-generate-template', {
        ranges : [],
        range: "",
        size: "",
        generate: true,
        handleGenerate : function(event) {
          $('#modal-generate-spinner').show();
          view1.set('generate', false);
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
                  oboe(url + '/$count?' + qs.stringify({ where: where})).done(function(results) {
                      if (formData.size >= results[0].value) {
                        window.location.href = document.location.protocol + '//' + document.location.host + '/' + formData.range + '/*?' + qs.stringify({
                            where : where,
                            alt: "csv"
                        });
                        heart.killEvent('spin');
                        metrics();
                        $('#modal-generate').modal('toggle');
                        view1.set('generate', true);
                        $('#modal-generate-spinner').hide();
                      }
                  })
              });
          })
          .always(function() {
              console.log("Request", url, formData);
          })
          .fail(function( jqXHR, textStatus ) {
              $('#modal-generate').modal('toggle');
              view1.set('generate', true);
              $('#modal-generate-spinner').hide();
          });
          return false;
        }
    });
    var view2 = view('metrics', {
        countRanges: 0,
        countIdentifiers: 0
    });
    var view4 = view('form-resolve-template', {
      name: "",
      handleResolve : function(event) {
        window.location.href = document.location.protocol + '//' + document.location.host + $("#form-resolve-addon-ark").text() + view4.get('name');
        return false;
      }
    });

    function metrics() {
      oboe(window.location.protocol + '//' + window.location.host + '/index/*').done(function(ranges) {
          view1.set('ranges', ranges);
          view2.set('countRanges', ranges.length);

          async.map(ranges.map(function(item) {
                return item['@id'] + '/$count';
            }), function(url, callback) {
              console.log('fetch', url);
              oboe(url).done(function(ranges) {
                  callback(null, Number(ranges[0].value));
              }).fail(function() {
                  callback(null, 0);
              })
            }, function(err, results) {
              view2.set( 'countIdentifiers', results.reduce(function(pv, cv) { return pv + cv; }, 0));
          });

          async.map(ranges.map(function(item) {
                return item['@id'] + '/$distinct?field=bundle';
            }), function(url, callback) {
              console.log('fetch', url);
              oboe(url).done(function(ranges) {
                  callback(null, Number(ranges.length));
              }).fail(function() {
                  callback(null, 0);
              })
            }, function(err, results) {
              view2.set( 'countRanges', results.reduce(function(pv, cv) { return pv + cv; }, 0));
          });


      })
    }
    metrics();


});
