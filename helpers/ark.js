'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:helpers:' + basename)
  , pad = require('pad')
  , alphabet = 'ybcdfghjklmnpqrstvwxz0123456789'
  , basek = require('basek')
  ;

basek.alphaSet(alphabet)

var randomInt = function() {
  return Math.floor(Math.random() * 9007199254740992);
};

function ARK(naan, subpub)
{
  if (!(this instanceof ARK)) {
    return new ARK(naan, subpub);
  }
  this.naan = String(pad(5, naan || 0, '0'));
  this.subpub = String(pad(2, subpub || 0, 'y'));
}

ARK.prototype = {
  generate: function(seed) {
    var nid = randomInt() + 1;
    var id = basek.toBase(nid).pad(4).get();
    return 'ark:/' + this.naan + '/' + this.subpub + '-' + id;
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
    return {
      value : str,
      name: seg[2],
      subpub: seg[2].substring(0, 4),
      identifier: seg[2].substring(4, -1),
      naan : seg[1]
    }
  }
}


module.exports = ARK;

