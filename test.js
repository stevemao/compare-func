'use strict';
var assert = require('assert');
var compareFunc = require('./');

it('should sort letters', function() {
  assert([{
    foo: 'b'
  }, {
    foo: 'a'
  }, {
    foo: 'c'
  }].sort(compareFunc('foo'))[0].foo === 'a');
});

it('should sort numbers', function() {
  assert([{
    foo: 2
  }, {
    foo: 1
  }, {
    foo: 3
  }].sort(compareFunc('foo'))[0].foo === 1);
});

it('should sort by an array of strings', function() {
  assert([{
    foo: 'b',
    bar: 'a'
  }, {
    foo: 'a',
    bar: 'c'
  }, {
    foo: 'a',
    bar: 'b'
  }, {
    foo: 'c',
    bar: 'c'
  }].sort(compareFunc(['foo', 'bar']))[0].bar === 'b');
});

it('should work with dot-prop', function() {
  assert([{
    foo: {
      bar: 'b'
    }
  }, {
    foo: {
      bar: 'a'
    }
  }, {
    foo: {
      bar: 'c'
    }
  }].sort(compareFunc('foo.bar'))[0].foo.bar === 'a');
});

it('should sort by a function', function() {
  assert([{
    foo: 'b'
  }, {
    foo: 'a'
  }, {
    foo: 'c'
  }].sort(compareFunc(function(prop) {
    return prop.foo;
  }))[0].foo === 'a');
});

it('should work if one object does not have this prop', function() {
  assert([{
    bar: 'b'
  }, {
    foo: 'b'
  }, {
    foo: 'a'
  }].sort(compareFunc('foo'))[1].foo === 'a');
});

it('should sort by an array of functions', function() {
  assert([{
    foo: 'b',
    bar: 'a'
  }, {
    foo: 'a',
    bar: 'b'
  }, {
    foo: 'a',
    bar: 'c'
  }, {
    foo: 'c',
    bar: 'c'
  }].sort(compareFunc([function(prop) {
    return prop.foo;
  }, function(prop) {
    return prop.bar;
  }]))[0].bar === 'b');
});

it('should sort on itself if there are no args', function() {
  assert(['z', 'b', 'a'].sort(compareFunc())[0] === 'a');
});
