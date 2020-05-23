'use strict'

const http = require('./util').httpClient

module.exports = {
  ...require('./api'),
  http,
}
