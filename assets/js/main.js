/* global $, Vue, document, JSONEditor, paperclip */
'use strict';
$(document).ready(function() {

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
