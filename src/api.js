'use strict'

let { normalizeUrl } = require('./util')

function api(host, salt) {
  host = normalizeUrl(host)

  let administration = require('./administration')(host, salt)
  let monitoring = require('./monitoring')(host, salt)
  let recording = require('./recording')(host, salt)
  let hooks = require('./hooks')(host, salt)

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
