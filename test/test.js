'use strict';

var path = require('path');
var generate = require('markdown-it-testgen');

describe('markdown-it-flowdock', function () {
  var md;

  beforeEach(function () {
    md = require('markdown-it')({
      html:        false,
      langPrefix:  '',
      typographer: false,
      linkify:     false      
    });
  });

  it('applies markup to hashtags', function () {
    md.use(require('../src'));
    generate(path.join(__dirname, 'fixtures/hashtag/default.txt'), md);
  });

  it('applies markup to mentions', function () {
    md.use(require('../src'));
    generate(path.join(__dirname, 'fixtures/mention/default.txt'), md);
  });
  
  it('applies markup to urls', function () {
    md.use(require('../src'));
    generate(path.join(__dirname, 'fixtures/url/default.txt'), md);
  });
});
