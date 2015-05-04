'use strict';
var dotPropGet = require('dot-prop').get;
var clone = require('clone');

function compareFunc(prop) {
  return function(a, b) {
    var retNumber = 0;

    (Array.isArray(prop) ? prop : [prop]).some(function(el) {
      var newA;
      var newB;

      if (typeof el === 'function') {
        newA = el(a);
        newB = el(b);
      } else if (typeof el === 'string') {
        newA = dotPropGet(a, el);
        newB = dotPropGet(b, el);
      } else {
        newA = clone(a);
        newB = clone(b);
      }

      if (typeof newA === 'string' && typeof newB === 'string') {
        retNumber = newA.localeCompare(newB);
        if (retNumber !== 0) {
          return true;
        }
      }

      if (newA === newB) {
        retNumber = 0;
      } else if (newA < newB) {
        retNumber = -1;
        return true;
      } else if (newA > newB) {
        retNumber = 1;
        return true;
      }
    });

    return retNumber;
  };
}

module.exports = compareFunc;
