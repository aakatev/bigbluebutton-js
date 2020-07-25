const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    library: 'bigbluebutton',
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser.js',
  },
}
