'use strict'

let { normalizeUrl } = require('./util')

function api(host, salt, options = {}) {
  options.host = normalizeUrl(host)
  options.salt = salt

  let administration = require('./administration')(options)
  let monitoring = require('./monitoring')(options)
  let recording = require('./recording')(options)
  let hooks = require('./hooks')(options)

  return {
    administration,
    monitoring,
    recording,
    hooks,
  }
}

module.exports = {
  api,
}
