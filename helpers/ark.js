'use strict';
var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:helpers:' + basename)
  , pad = require('pad')
  , alphabet = '0123456789bcdfghjklmnpqrstvwxz'
  , basek = require('basek')
  ;



// Random integer between min (inclusive) and max (exclusive)
var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
//                   id1                                           id0
// 0 ------------------------  1451606400 ------------------ 456580468 ------------------------------- 9007199254740992
// 0  ------------ 4974068
// 0 ---- 32323 --


function ARK(naan, subpub)
{
  if (!(this instanceof ARK)) {
    return new ARK(naan, subpub);
  }
  this.naan = String(pad(5, naan || 0, '0'));
  this.subpub = String(pad(2, subpub || 0, 'y')).toUpperCase();
}

ARK.prototype = {
  generate: function(seed) {
    var id0 = Date.now();
    var id1 = id0 - 1451606400;
    var id2 = randomInt(0, id1);
    var id3 = randomInt(id1, id0);
    var id4 = id3 - id2;
    var id5 = id4 < 0 ? id4 * -1 : id4;
    var id6 = randomInt(0, id5);
    var id7 = id5 - id6;
    var id8 =  id7 < 0 ? id7 * -1 : id7;
    var id9 = randomInt(0, id8);
    basek.alphaSet(alphabet);
    return 'ark:/' + this.naan + '/' + this.subpub + '-' +
           basek.toBase(id9).pad(4).get().toUpperCase();
  }
};


module.exports = ARK;

