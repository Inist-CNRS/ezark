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
     title:  Joi.string().required(),
     description:  Joi.string().required(),
     target: Joi.string().required()
   }
 }))
  .post(function(req, res, next) {
    debug('debug', req.body);
    var opt = {
      query : {
        typ: 'fake'
      },
      body : {
        filename : Date.now().toString().concat('.new'),
        content : req.body
      },
      json : true
    };
    req.core.agent.post('/index', opt)
    .then(function(response) {
      //console.log(response.body);
      res.send(response.body);
    })
    .catch(next);
  })
}
