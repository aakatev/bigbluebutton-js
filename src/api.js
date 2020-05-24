'use strict'

function api(host, salt) {
  return {
    administration: require('./administration')(host, salt),
    monitoring: require('./monitoring')(host, salt),
    recording: require('./recording')(host, salt),
    hooks: require('./hooks')(host, salt),
  }
}

module.exports = {
  api,
}
