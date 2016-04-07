/*jshint node:true,laxcomma:true*/
'use strict';

var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:routes:' + basename)
  , bodyParser = require('body-parser')
  , validate = require('express-validation')
  , Joi = require('joi')
  , url = require('url')
  , Loader = require('castor-load')
  , shortid = require('shortid')
 ;

module.exports = function(router, core) {

  router
  .route('/-/generator')
  .post(bodyParser.json()) // for this.$http.post (vue-resource)
  .post(bodyParser.urlencoded({ extended: true})) // for $.ajax (jquery)
  /*
  .post(validate({
        body : {
         size:  Joi.string().regex(/[0-9]+/).required(),
          range: Joi.string().regex(/[0-9]+/).required()
        }
      }))
      */
  .post(function(req, res, next) {
    debug('debug', req.body);
    var range = req.body.range.toLocaleLowerCase();
    var size = req.body.size;
    var loaderOptions = {
      "collectionName" : range,
      "connexionURI" : req.config.get('connectionURI'),
      "concurrency" : req.config.get('concurrency'),
      "delay" : req.config.get('delay'),
      "maxFileSize" : req.config.get('maxFileSize'),
      "writeConcern" : req.config.get('writeConcern'),
      "ignore" : req.config.get('filesToIgnore'),
      "watch" : false
    }
    var documentURL = {
      protocol: "http",
      hostname: "127.0.0.1",
      port: req.config.get('port'),
      query: {
        plain : size
      }
    }
    var arkOptions = {
      range: range,
      naan: req.config.get('NAAN'),
      size: size
    }

    process.env['HTTP_PROXY'] = null;
    process.env['HTTPS_PROXY'] = null;
    process.env['http_proxy'] = null;
    process.env['https_proxy'] = null;

    var  listname = shortid.generate();
    documentURL.pathname = "/-/echo/" + listname + ".list";
    var ldr;
    ldr = new Loader(__dirname, loaderOptions);
    ldr.use('**/*', require('../loaders/bundle.js')(arkOptions));
    ldr.push(url.format(documentURL));
    res.send(listname);
  })
}
