'use strict';
var assert = require('assert');
var compareFunc = require('./');

it('1', function() {
  assert([{
    foo: 'b'
  }, {
    foo: 'a'
  }, {
    foo: 'c'
  }].sort(compareFunc('foo'))[0].foo === 'a');
});

it('2', function() {
  assert([{
    foo: 2
  }, {
    foo: 1
  }, {
    foo: 3
  }].sort(compareFunc('foo'))[0].foo === 1);
});

it('3', function() {
  assert([{
    foo: 'b',
    bar: 'b'
  }, {
    foo: 'a',
    bar: 'b'
  }, {
    foo: 'a',
    bar: 'a'
  }, {
    foo: 'c',
    bar: 'c'
  }].sort(compareFunc(['foo', 'bar']))[0].bar === 'a');
});

it('4', function() {
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

it('5', function() {
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

it('6', function() {
  assert([{
    bar: 'b'
  }, {
    foo: 'b'
  }, {
    foo: 'a'
  }].sort(compareFunc('foo'))[1].foo === 'a');
});

it('7', function() {
  assert([{
    foo: 'b',
    bar: 'b'
  }, {
    foo: 'a',
    bar: 'b'
  }, {
    foo: 'a',
    bar: 'a'
  }, {
    foo: 'c',
    bar: 'c'
  }].sort(compareFunc(['foo', 'bar']))[0].bar === 'a');
});

it('8', function() {
  assert(['z', 'b', 'a'].sort(compareFunc())[0] === 'a');
});
