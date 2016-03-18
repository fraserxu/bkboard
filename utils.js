var qs = require('querystring')

exports.formatLink = function formatLink (links) {
  var linksObj = {}
  links.split(',')
    .forEach(function (link) {
      var rel = qs.parse(link.split(';')[1].trim().replace(/"/g, '')).rel
      var re = /[^<>]+(?=\>)/gi
      linksObj[rel] = link.match(re)[0]
    })
  return linksObj
}
