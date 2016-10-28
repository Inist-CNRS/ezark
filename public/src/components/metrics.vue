<template>
			<div class="row">
				<div class="col-xs-6 col-md-3">
					<div class="panel status panel-info">
						<div class="panel-heading">
							<h1 class="panel-title text-center">
								{{ naan }}
				            </h1>
						</div>
						<div class="panel-body text-center">
							<a href="http://www.cdlib.org/uc3/naan_registry.txt"><strong>NAAN</strong></a>
						</div>
					</div>
				</div>
				<div class="col-xs-6 col-md-3">
					<div class="panel status panel-warning">
						<div class="panel-heading">
							<h1 class="panel-title text-center" id="count-range-handle">
								{{ countRanges }}</a>
							</h1>
						</div>
						<div class="panel-body text-center">
							<a href="/index/*?alt=tsv"><strong>Sub Publisher</strong></a>
						</div>
					</div>
				</div>
				<div class="col-xs-6 col-md-3">
					<div class="panel status panel-success">
						<div class="panel-heading">
							<h1 class="panel-title text-center" id="count-identifier-handle">
								{{ countIdentifiers }}
							</h1>
						</div>
						<div class="panel-body text-center">
							<strong>Identifiers</strong>
						</div>
					</div>
				</div>
				<div class="col-xs-6 col-md-3">
					<div class="panel status panel-info">
						<div class="panel-heading">
							<h1 class="panel-title text-center">
								{{ countBundles }}
							</h1>
						</div>
						<div class="panel-body text-center">
							<strong>Bundles</strong>
						</div>
					</div>
				</div>
			</div>
</template>

<script>
import async from 'async'
export default {
  el: '#metrics',
  ready () {
    var self = this;
	self.$http.get(self.serverURL + '/-/config.json').then(function (response) {
      self.$set('naan', response.data.NAAN);
    }, console.error);

    self.$http.get(self.serverURL + '/index/*').then(function (response) {
      var ranges = response.data
      this.$set('countRanges', ranges.length);
      async.map(ranges.map(function(item) {
        return item['_id'] + '/$count';
      }), function(url, callback) {
        self.$http.get(url).then(function (response) {
          if (response.data[0]) {
            callback(null, Number(response.data[0].value || 0));
          }
          else {
            callback(null, 0);
          }
        }, function() {
          callback(null, 0);
        });
      }, function(err, results) {
        self.$set('countIdentifiers', results.reduce(function(pv, cv) { return pv + cv; }, 0));
      });

      async.map(ranges.map(function(item) {
        return item['_id'] + '/$distinct?field=_content.json.bundle';
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
  data () {
	  return {
		serverURL : window.location.protocol + '//' + window.location.host,
		countRanges: 0,
		countIdentifiers: 0,
		countBundles: 0,
		naan : ''
		}
  }
}
</script>

<style scoped>
</style>
