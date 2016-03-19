var getBuilds = require('./index.js')

var token = 'xxxx'

getBuilds(token, {
  from: '2016-03-13T00:00:00Z',
  to: '2016-03-18T00:00:00Z',
  org: 'xxx',
  pipeline: 'xxx'
}, function (err, builds) {
  console.log('err', err)
  console.log('builds', builds)
})
