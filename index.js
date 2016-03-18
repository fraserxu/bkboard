var qs = require('querystring')
var got = require('got')

var objectAssign = require('object-assign')
var gitConfig = require('git-config')

var utils = require('./utils')

var config = gitConfig.sync()
var BUILDKITE_API_ENDPOINT = 'https://api.buildkite.com/v2/'
var BUILDKITE_API_KEY = config.buildkite.apikey || process.env.BUILDKITE_API_KEY

if (!BUILDKITE_API_KEY) {
  throw new Error('BUILDKITE_API_KEY not found.')
}

function request (type, opts) {
  var params = objectAssign({
    access_token: BUILDKITE_API_KEY
  }, opts)
  return got(BUILDKITE_API_ENDPOINT + type + '?' + qs.stringify(params), {
    json: true
  })
}

module.exports = function getBuilds (org, pipeline, from, to, cb) {
  var MARKET_BUILDS_URL = 'organizations/' + org + '/pipelines/' + pipeline + '/builds'
  request(MARKET_BUILDS_URL, {
    'created_from': from,
    'created_to': to,
    'per_page': 50
  }).then(function (res) {
    var builds = res.body

    function requestNext (res) {
      if (res.headers.link && utils.formatLink(res.headers.link).next) {
        var nextLink = utils.formatLink(res.headers.link).next
        got(nextLink, {
          json: true
        }).then(function (res) {
          builds = builds.concat(res.body)
          requestNext(res)
        })
      } else {
        cb(null, builds)
      }
    }

    requestNext(res)
  }).catch(function (err) {
    cb(err)
  })
}
