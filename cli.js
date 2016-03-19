#!/usr/bin/env node

var _ = require('lodash')
var ora = require('ora')
var argv = require('minimist')(process.argv.slice(2))
var gitConfig = require('git-config')

var drawBoard = require('./graph.js')
var getBuilds = require('./index.js')

var COLORS = {
  passed: 'green',
  failed: 'red'
}

var config = gitConfig.sync()
var BUILDKITE_API_KEY = config.buildkite.apikey || process.env.BUILDKITE_API_KEY
var spinner = ora('Loading builds from Buildkite...')

if (!BUILDKITE_API_KEY) {
  throw new Error('BUILDKITE_API_KEY not found.')
}

// list builds for a pipeline
var from = argv._[0] || argv.f || argv.from || '2016-03-13T00:00:00Z'
var to = argv._[1] || argv.t || argv.to || '2016-03-16T00:00:00Z'
var org = argv._[2] || argv.o || argv.org
var pipeline = argv._[3] || argv.p || argv.pipeline

function groupBuildsByState (builds) {
  var buildsByState = _.groupBy(builds, function (build) {
    return build.state
  })

  var total = builds.length
  var data = Object.keys(buildsByState).map(function (state) {
    return {
      percent: ((buildsByState[state].length / total) * 100).toFixed(0),
      label: state,
      color: COLORS[state] || 'cyan'
    }
  })

  return data
}

function groupBuildsByCreator (builds) {
  var buildsByCreator = _.groupBy(builds, function (build) {
    if (build.creator && build.creator.name) {
      return build.creator.name
    } else {
      return 'Unknown'
    }
  })

  var titles = Object.keys(buildsByCreator).map(function (name) {
    return name.split(' ')[0]
  })
  var data = Object.keys(buildsByCreator).map(function (key) {
    return buildsByCreator[key].length
  })
  return {
    titles: titles,
    data: data
  }
}

getBuilds(BUILDKITE_API_KEY, {
  org: org,
  pipeline: pipeline,
  from: from,
  to: to
}, function (err, builds) {
  if (err) {
    console.log('err', err)
    spinner.stop()
    process.exit(1)
  }

  builds = builds.map(function (build) {
    return {
      state: build.state,
      creator: build.creator
    }
  })

  var buildsByState = groupBuildsByState(builds)
  var buildsByCreator = groupBuildsByCreator(builds)

  drawBoard(buildsByCreator, buildsByState)
})

spinner.start()
