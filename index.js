'use strict';
var dotProp = require('dot-prop');
var _ = require('lodash');

function compareFunc(prop) {
  return function(a, b) {
    var retNumber = 0;

    _.each((_.isArray(prop) ? prop : [prop]), function(el) {
      var newA;
      var newB;

      if (_.isFunction(el)) {
        newA = el(a);
        newB = el(b);
      } else if (_.isString(el)) {
        newA = dotProp.get(a, el);
        newB = dotProp.get(b, el);
      } else {
        newA = _.cloneDeep(a);
        newB = _.cloneDeep(b);
      }

      if (_.isString(newA) && _.isString(newB)) {
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
