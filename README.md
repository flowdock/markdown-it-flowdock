# markdown-it-flowdock

[![Build Status](https://travis-ci.org/flowdock/markdown-it-flowdock.svg)](https://travis-ci.org/flowdock/markdown-it-flowdock)

> flowdock hashtag (`#tag`), mentions (`@user`) and relaxed autolink plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

* `@user` => `<a class="mention">@user</a>`
* `#hashtag` => `<a class="hashtag">#hashtag</a>`
* `https://github.com/flowdock/markdown-it-flowdock` => `<a href="https://github.com/flowdock/markdown-it-flowdock">https://github.com/flowdock/markdown-it-flowdock</a>`

## Install

node.js:

```bash
npm install markdown-it-flowdock --save
```

```js
var md = require('markdown-it')().use(require('markdown-it-diaspora-flowdock'));
md.render('Test #hahstag @user'); // => 'Test <a class="hashtag">#hashtag</a> <a class="mention">@user</a>'
```

## Tests

Tests are run with npm:

```bash
npm install
npm test
```
