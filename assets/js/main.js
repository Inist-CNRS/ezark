var Vue = require('vue');
Vue.config.delimiters = ['[[', ']]'];
Vue.use(require('vue-resource'));

require('components/metrics');
require('components/modal-generate');
require('components/form-resolve');
require('components/modal-addsubpub');

