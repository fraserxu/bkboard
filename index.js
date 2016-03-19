var qs = require('querystring')
var linkParser = require('parse-link-header')
var axios = require('axios')
var objectAssign = require('object-assign')

var BUILDKITE_API_ENDPOINT = 'https://api.buildkite.com/v2/'

module.exports = function getBuilds (token, opts, cb) {
  if (!token) throw new Error('Token is required.')

  function request (endpoint, opts) {
    var params = objectAssign({
      access_token: token
    }, opts)
    return axios(BUILDKITE_API_ENDPOINT + endpoint + '?' + qs.stringify(params))
  }

  var MARKET_BUILDS_URL = 'organizations/' + opts.org + '/pipelines/' + opts.pipeline + '/builds'
  request(MARKET_BUILDS_URL, {
    'created_from': opts.from,
    'created_to': opts.to,
    'per_page': 50
  }).then(function (res) {
    var builds = res.data
    function requestNext (res) {
      if (res.headers.link && linkParser(res.headers.link).next) {
        var nextLink = linkParser(res.headers.link).next.url
        axios(nextLink).then(function (res) {
          builds = builds.concat(res.data)
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
