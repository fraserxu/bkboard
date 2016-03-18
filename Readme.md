bkboard
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

A Buildkite build report dashboard in terminal and web, or anywhere.

<img width="890" alt="bkboard" src="https://cloud.githubusercontent.com/assets/1183541/13878389/1cb3792c-ed65-11e5-9e8f-b3c69a70f78c.png">

### Installation

```sh
$ npm install bkboard --save
```

### Usage in browser

```JavaScript
var bkboard = require('bkboard')

/**
 * Get the builds data from a pipeline
 * @param  {String}      Org name
 * @param  {String}      Pipeline name
 * @param  {String}      Start time
 * @param  {String}      End time
 * @param  {Function}    Callback function with `err, builds`
 */
bkboard(org, pipeline, from, to, function (err, builds) {
  if (err) {
    console.log('err', err)
    return
  }

  drawBoard(builds)
})
```

### Usage from terminal

```sh
$ npm install bkboard -g
```

Please make sure you get Buildkite api_token from https://buildkite.com/user/api-access-tokens and set it with `git config` or pass it to `process.env.BUILDKITE_API_KEY`.

### Exampe

```sh
$ bkboard --from='2016-03-13T00:00:00Z' --to='2016-03-16T00:00:00Z' --org='$ORG' --pipeline='$PIPELINE'
```

### License

MIT

[npm-image]: https://img.shields.io/npm/v/bkboard.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bkboard
[travis-image]: https://img.shields.io/travis/fraserxu/bkboard/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/fraserxu/bkboard
[downloads-image]: http://img.shields.io/npm/dm/bkboard.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/bkboard
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
