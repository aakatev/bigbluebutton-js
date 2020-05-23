'use strict'

const admin = require('./administration')
const monitor = require('./monitoring')
const rec = require('./recording')

function createServer(host, salt) {
  let administration = admin(host, salt)
  let monitoring = monitor(host, salt)
  let recording = rec(host, salt)

  let server = {
    administration,
    monitoring,
    recording,
  }

  return server
}

module.exports = {
  server: createServer,
}
