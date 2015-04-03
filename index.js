'use strict';
var dotProp = require('dot-prop');
var each = require('lodash.foreach');
var cloneDeep = require('lodash.clonedeep');

function compareFunc(prop) {
  return function(a, b) {
    var retNumber = 0;

    each((Array.isArray(prop) ? prop : [prop]), function(el) {
      var newA;
      var newB;

      if (typeof el === 'function') {
        newA = prop(a);
        newB = prop(b);
      } else if (typeof el === 'string') {
        newA = dotProp(a, el);
        newB = dotProp(b, el);
      } else {
        newA = cloneDeep(a);
        newB = cloneDeep(b);
      }

      if (typeof newA === 'string' && typeof newB === 'string') {
        retNumber = newA.localeCompare(newB);
        if (retNumber !== 0) {
          return false;
        }
      }

      if (newA === newB) {
        retNumber = 0;
      } else if (newA < newB) {
        retNumber = -1;
        return false;
      } else if (newA > newB) {
        retNumber = 1;
        return false;
      }
    });

    return retNumber;
  };
}

module.exports = compareFunc;
