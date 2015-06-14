'use strict';
var equal = require('assert').strictEqual;
var compareFunc = require('./');

it('should sort letters', function() {
  equal([{
    foo: 'b'
  }, {
    foo: 'a'
  }, {
    foo: 'c'
  }].sort(compareFunc('foo'))[0].foo, 'a');
});

it('should sort numbers', function() {
  equal([{
    foo: 2
  }, {
    foo: 1
  }, {
    foo: 3
  }].sort(compareFunc('foo'))[0].foo, 1);
});

it('should sort by an array of strings', function() {
  equal([{
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
  }].sort(compareFunc(['foo', 'bar']))[0].bar, 'b');
});

it('should work with dot-prop', function() {
  equal([{
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
  }].sort(compareFunc('foo.bar'))[0].foo.bar, 'a');
});

it('should sort by a function', function() {
  equal([{
    foo: 'b'
  }, {
    foo: 'a'
  }, {
    foo: 'c'
  }].sort(compareFunc(function(prop) {
    return prop.foo;
  }))[0].foo, 'a');
});

it('should work if one object does not have this prop', function() {
  var sorted = [{
    bar: 'b'
  }, {
    foo: 'b'
  }, {
    foo: 'a'
  }].sort(compareFunc('foo'));

  // {bar: 'b'} is not sorted so it might be the first or the second element
  equal(sorted[0].foo || sorted[1].foo, 'a');
});

it('should sort by an array of functions', function() {
  equal([{
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
  }]))[0].bar, 'b');
});

it('should sort on itself if there are no args', function() {
  equal(['z', 'b', 'a'].sort(compareFunc())[0], 'a');
});
