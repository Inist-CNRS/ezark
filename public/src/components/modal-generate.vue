<template>
	<div>
		<a class="btn btn-primary btn-lg" href="#" role="button" data-toggle="modal" data-target="#modal-generate">New ARK &raquo;</a>
		<div id="modal-generate" class="modal fade">
			<validator name="validation1">
			<form novalidate class="form-horizontal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title">Generate new ARK</h4>
						</div>
						<div class="modal-body">
							<!-- see templates/select-range.html -->
							<div class="form-group">
								<label for="modal-generate-input-range" class="col-sm-4 control-label">Sub publisher</label>
								<div class="col-sm-8" id="select-range-handle">
									<select class="form-control" id="modal-generate-input-range" v-model="range"  v-validate:range="{ required: true }">
										<option v-for="rg in ranges" v-bind:value="rg._id">
										{{ rg.value }}
										</option>
									</select>
									<span class="help-block has-error" v-if="$validation1.range.required">Veuillez choisir un préfix</span>
								</div>
							</div>
							<div class="form-group">
								<label for="modal-generate-input-size" class="col-sm-4 control-label">Number</label>
								<div class="col-sm-8">
									<input id="modal-generate-input-size" type="text" class="form-control" v-model="size"  v-validate:size="{ required: true, numeric : true }">
									<span class="help-block" v-if="$validation1.size.required">Veuillez choisir le nombre d'identifiant à générer</span>
									<span class="help-block" v-if="$validation1.size.numeric">Veuillez choisir un nombre</span>
								</div>
							</div>
							<!--
							<div class="form-group">
								<label for="modal-generate-input-token" class="col-sm-4 control-label">Secure Token</label>
								<div class="col-sm-8">
									<input id="modal-generate-input-token" type="text" class="form-control" v-model="token">
								</div>
							</div>
							-->
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary" v-on:click="handleGenerate"  v-if="$validation1.valid">
								<span id="modal-generate-spinner" style="display:none" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> {{ label }}
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

import mqs from 'mongodb-querystring'

export default {
  el: '#generate',
  ready () {
    var self = this;
    self.$http.get(self.serverURL + '/index/*').then(function (response) {
      self.$set('ranges', response.data);
    }, console.error);

    self.$http.get(self.serverURL + '/-/config.json').then(function (response) {
      self.$set('naan', response.data.NAAN);
    }, console.error);

  },
  data () {
	  return {
		serverURL : window.location.protocol + '//' + window.location.host,
		ranges : [],
		range: "",
		naan: "?",
		size: 10,
		label: "Generate",
		generate: true,
		token: ""
	  }
  },
  methods : {
    handleGenerate : function(event) {
      var self = this;
      if (self.generate === false) {
        return false;
      }
      $('#modal-generate-spinner').show();
      self.$set('generate', false);

      var queryData = {
        naan : self.naan,
        subpub: self.range,
        size: Number(self.size),
        bundle : Date.now().toString()
      }
      var serverHost = window.location.protocol + '//' + window.location.host;
      var url = serverHost + '/' + self.range + '/';
      var formData = {
        // BUG? : see https://trello.com/c/A0oNBnRq
        'url' : 'http://127.0.0.1:3000/-/echo/' + queryData.bundle.concat('.ark') + '?' + mqs.stringify(queryData)
      }
      self.$http.post(url, formData).then(function(result) {
        $('#modal-generate').modal('toggle');
        self.$set('generate', true);
        self.$set('label', "Generate");
        $('#modal-generate-spinner').hide();
        window.location.href = serverHost + result.headers('location') + '&alt=tsv';
      }, console.error);
    }
  }
}
</script>

<style scoped>
</style>
