/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "mqs|heartbeats|async"}] */
'use strict';
var mqs = require('mongodb-querystring');
var heartbeats = require("heartbeats");
var async = require("async");
var Vue = require("vue");

Vue.config.delimiters = ['[[', ']]'];

Vue.use(require('vue-validator'));
Vue.use(require('vue-resource'));


Vue.validator('email', function (val) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
})
Vue.validator('numeric', function (val) {
  return /^[-+]?[0-9]+$/.test(val)
})
Vue.validator('url', function (val) {
  return /^(http\:\/\/|https\:\/\/)(.{4,})$/.test(val)
})

require("./metrics.js");
require("./modal-generate.js");
require("./modal-addsubpub.js");
require("./form-resolve.js");
