<template>
	<div>
		<div class="text-right">
			<a class="btn btn-primary btn-lg" href="#" role="button" data-toggle="modal" data-target="#modal-addsubpub">New Sub Publisher&raquo;</a></p>
		</div>
		<div id="modal-addsubpub" class="modal fade">
			<validator name="validation2">
			<form novalidate class="form-horizontal" v-on:submit.prevent="handleAddsubpub">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title">Generate new sub publisher</h4>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<label for="modal-addsubpub-input-target" class="col-sm-4 control-label">URL</label>
								<div class="col-sm-8">
									<input id="modal-addsubpub-input-target" type="url" class="form-control" v-model="target" v-validate:target="{ required: true, url : true }">
									<span class="help-block" v-if="$validation2.target.url" v-if="$validation2.target.required">Veuillez choisir l'URL de destination des ARK</span>
								</div>
							</div>

							<div class="form-group">
								<label for="modal-addsubpub-input-name" class="col-sm-4 control-label">Nom</label>
								<div class="col-sm-8">
									<input id="modal-addsubpub-input-name" type="text" class="form-control" v-model="name">
									<span class="help-block">projet, application, service</span>

								</div>
							</div>
							<div class="form-group">
								<label for="modal-addsubpub-input-subject" class="col-sm-4 control-label">Sujet</label>
								<div class="col-sm-8">
									<input id="modal-addsubpub-input-subject" type="text" class="form-control" v-model="subject">
									<span class="help-block">dépot, étude, jeu de données</span>
								</div>
							</div>
							<div class="form-group">
								<label for="modal-addsubpub-input-description" class="col-sm-4 control-label">Description</label>
								<div class="col-sm-8">
									<input id="modal-addsubpub-input-description" type="text" class="form-control" v-model="description">
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button type="submit" class="btn btn-primary" v-on:click="handleAddsubpub" v-if="$validation2.valid">
								<span id="modal-addsubpub-spinner" style="display:none" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> {{ label }}
							</button>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</form>
			</validator>
		</div><!-- /.modal -->
	</div>
</template>

<script>
import MQS from 'mongodb-querystring';
export default {
  el: '#addsubpub',
  ready: function() {
    var self = this;
    self.$http.get(self.serverURL + '/-/config.json').then(function (response) {
      self.$set('naan', response.data.NAAN);
    }, console.error);
  },
  data () {
	  return {
		serverURL : window.location.protocol + '//' + window.location.host,
		name: "",
		subject : "",
		description: "",
		target: "",
		label: "Generate",
		generate: true,
		naan: ""
	  }
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
          // BUG? : see https://trello.com/c/A0oNBnRq
          'url' : 'http://127.0.0.1:3000/-/echo/' + Date.now().toString().concat('.sp') + '?' + MQS.stringify(queryData)
        }
        self.$http.post(url, formData).then(function (result) {
            $('#modal-addsubpub').modal('toggle');
            self.$set('generate', true);
            self.$set('label', "Generate");
            $('#modal-addsubpub-spinner').hide();
            document.location.reload();
          }, function(e) {
            $('#modal-addsubpub').modal('toggle');
            this.$set('generate', true);
            $('#modal-addsubpub-spinner').hide();
          });
        }
      }
    }
  }
</script>
<style scoped>
</style>
