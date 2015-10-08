/* global $, Vue, document, JSONEditor, paperclip */
'use strict';
$(document).ready(function() {


    var oboe = require('oboe');
    var async = require('async');
    var heart = require('heartbeats').createHeart(100);
    var pc = require("paperclip/lib/node.js");

    var tpl1 = document.getElementById("select-range-template").innerHTML.replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
    var tpl2 = document.getElementById("count-range-template").innerHTML.replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
    var tpl3 = document.getElementById("count-identifier-template").innerHTML.replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
    var view1 = pc.template(tpl1, pc).view({ items : [] });
    var view2 = pc.template(tpl2, pc).view({ count : 0 });
    var view3 = pc.template(tpl3, pc).view({ count: 0});
    document.getElementById("select-range-handle").appendChild(view1.render());
    document.getElementById("count-range-handle").appendChild(view2.render());
    document.getElementById("count-identifier-handle").appendChild(view3.render());

    oboe(window.location.protocol + '//' + window.location.host + '/index/*').done(function(items) {
        console.log('setview', items,  items.length);
        view1.set('items', items);
        view2.set('count', items.length);

        var urls = items.map(function(item) {
            return item['@id'] + '/$count';
        })
        async.map(urls, function(url, callback) {
            oboe(url).done(function(items) {
                callback(null, Number(items[0].value));
            })
          }, function(err, results) {
            console.log('setview 3', results);
            view3.set( 'count', results.reduce(function(pv, cv) { return pv + cv; }, 0));
        });
    })
    // heart.createEvent(200, function(heartbeat, last) { });

    function resark(ark) {
      console.log(ark);
      window.location.href = 'http://' + document.location.host + '/' + ark;
    }

    $('#form-resolve').submit(function() {
        resark($("#form-resolve-addon-ark").text().trim() + $("#form-resolve-input-ark").val().trim());
        return false;
    })
    $('#form-resolve-input-ark').keypress(function(e) {
        if (e.which == 13) {
          resark($("#form-resolve-addon-ark").text() + $("#form-resolve-input-ark").val());
          return false;
        }
    })



    $('#action-generate').click(function() {
        $('#modal-generate').modal('toggle');
        return false;
    });

    $('#modal-generate-submit').click(function() {
        var formData = {
          range: $("#modal-generate-input-range").val(),
          size : $("#modal-generate-input-size").val()
        }
        $.ajax({
            type: "POST",
            url: "/-/generator",
            data: formData,
            success: function(data) {
              console.log(data);
              $('#modal-generate').modal('toggle');
            }
        });
    });

});
