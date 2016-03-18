var blessed = require('blessed')
var contrib = require('blessed-contrib')

module.exports = function drawBoard (barData, donutData) {
  var screen = blessed.screen()
  var grid = new contrib.grid({
    rows: 2,
    cols: 1,
    screen: screen
  })

  var bar = grid.set(0, 0, 1, 1, contrib.bar, {
    label: 'Buildkite Weekly builds by creator chart',
    barWidth: 5,
    barSpacing: 1,
    xOffset: 0,
    maxHeight: 5
  })
  var donut = grid.set(1, 0, 1, 1, contrib.donut, {
    label: 'Buildkite Weekly builds by state chart',
    radius: 8,
    arcWidth: 3,
    remainColor: 'black',
    yPadding: 2
  })
  // var logo = grid.set(1, 1, 1, 1, contrib.picture, {
  //   file: './buildkite.png',
  //   onReady: ready
  // })

  bar.setData(barData)
  donut.setData(donutData)

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0)
  })

  screen.render()
}
