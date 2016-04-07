'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:helpers:' + basename)
    /*
   , checkdigit = require('checkdigit')
     */
  , pad = require('pad')
  , farmhash = require('farmhash')
  ;

function ARK(naan, range)
{
  if (!(this instanceof ARK)) {
    return new ARK(naan, range);
  }
  this.naan = String(pad(5, naan || 0, '0'));
  this.range = String(pad(2, range || 0, '0'));
}

ARK.prototype = {
  stringify: function(input, seed) {
    var hash = farmhash.hash32WithSeed(input, Number(seed || 0))
    debug(input, seed, hash);
    hash = pad(10, hash, '0');
    var id = this.range.concat(hash);
    /*
    var vid = checkdigit.mod10.apply(id);
    vid = pad(13, vid, '0')
    */
    return 'ark:/' + this.naan + '/' + id;
  },
  parse: function (str) {
    var seg = str.split('/');
    debug(seg, this.naan);
    if (seg.length != 3) {
      throw new Error('Invalid identifier');
    }
    if (seg[0] !== 'ark:') {
      throw new Error('Unknow identifier');
    }
    if (seg[1] !== this.naan) {
      throw new Error('Unknow NAAN');
    }
    /*
    if (checkdigit.mod10.isValid(seg[2]) === false) {
      throw new Error('Corrompted identifier');
    }
    */
    return {
      value : str,
      name: seg[2],
      range: seg[2].substring(0, 2),
      hash: seg[2].substring( 2, -1),
      naan : seg[1]
    }
  }
}


module.exports = ARK;

