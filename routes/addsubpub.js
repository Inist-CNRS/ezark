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
  .route('/-/addsubpub')
  .post(bodyParser.json()) // for this.$http.post (vue-resource)
  .post(bodyParser.urlencoded({ extended: true})) // for $.ajax (jquery)
 .post(validate({
   body : {
     name:  Joi.string().required(),
     target: Joi.string().required()
   }
 }))
  .post(function(req, res, next) {
    debug('debug', req.body);
    var opt = {
      internal: true,
      query : {
        typ: 'form',
        filename : Date.now().toString().concat('.sp')
      },
      body : req.body
    };
    req.core.agent.post('/index', opt)
    .then(function(response) {
      res.set(response.headers);
      res.sendStatus(201);
    })
    .catch(next);
  })
}
