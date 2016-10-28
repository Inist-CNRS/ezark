<template>
			<div id="form-resolve" class="row">
				<form id="form-resolve"  v-on:submit.prevent="handleResolve">
					<div class="col-sm-3">
					</div>
					<div class="form-group form-group-lg  col-sm-6">
						<div class="input-group">
							<div id="form-resolve-addon-ark" class="input-group-addon" style="font-size:2em; font-weight:bold;">ark:/{{ naan }}/</div>
							<input type="text" class="form-control" style="font-size:2em;" v-model="name"  v-on:keyup.enter="handleResolve" />
							<span v-if="error" class="help-block" v-bind:class="classObject" >{{ errorMsg }}</span>
						</div>
					</div>
				</form>
			</div>
</template>

<script>
import InistArk from 'inist-ark';
export default {
  el: '#resolve',
  data () {
	  return {
		serverURL : window.location.protocol + '//' + window.location.host,
		name: '',
		error: false,
		errorMsg: '',
		naan: '?'
	  }
  },
  ready: function() {
    var self = this;
    self.$http.get(self.serverURL + '/-/config.json').then(function (response) {
      self.$set('naan', response.data.NAAN);
    }, console.error);
  },
  methods: {
    handleResolve : function(event) {
	  var self = this;
	  self.error = false;
	  var idt = $("#form-resolve-addon-ark").text() + self.name ;
	  var ark = new InistArk();
	  try {
		  var obj = ark.parse(idt);
		  var ctl = ark.validate(idt)
		  Object.keys(ctl).forEach(function(key) {
			if (ctl[key] === false) {
				self.error = true;
				self.errorMsg = 'Fail to validate ' + key;
			}
		  })
		  if (self.error === false) {
			  self.$http.get(self.serverURL + '/' + obj.subpublisher + '/' + obj.name + '/*?alt=dry').then(function (response) {
				window.location.href = response.data[0]._columns.url.content;
			  }, console.error);
		  }
	  }
	  catch (e) {
	    self.error = true;
		self.errorMsg = e.toString();
	  }

      return false;
    }
  },
computed: {
  classObject: function () {
    return {
		'alert': this.name !== '' && this.errorMsg !== '',
		'alert-danger' : this.name !== '' && this.errorMsg !== ''
    }
  }
}
  }
</script>

<style scoped>
</style>
