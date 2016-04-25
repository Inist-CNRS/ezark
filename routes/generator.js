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
  .post(validate({
    body : {
      size:  Joi.number().integer().required(),
      range: Joi.string().required()
    }
  }))
  .post(function(req, res, next) {
    debug('debug', req.body);
    var body = {
      naan : core.config.get('NAAN'),
      subpub: req.body.range.toLocaleLowerCase(),
      size: req.body.size,
      bundle : shortid.generate()
    }
    var opt = {
      query : {
        typ: 'form',
        filename : String(body.bundle).concat('.ark')
      },
      body : body,
      json : true
    };
    core.agent.post('/' + body.subpub, opt)
    .then(function(response) {
      res.send(body);
    })
    .catch(next);
  })
}
