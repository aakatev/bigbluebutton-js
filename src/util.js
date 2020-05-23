'use strict'

const axios = require('axios')
const querystring = require('querystring')
const crypto = require('crypto')
const parser = require('fast-xml-parser')

function checksum(callName, qparams, salt) {
  let qstring = querystring.stringify(qparams)
  return crypto
    .createHash('sha1')
    .update(callName + qstring + salt)
    .digest('hex')
}

function GETAction(host, salt, action, params) {
  let cs = checksum(action, params, salt)

  params.checksum = cs

  let url = `${host}/api/${action}?${querystring.encode(params)}`
  let request = axios(url)

  return request
    .then((response) => response.data)
    .then(function (meeting) {
      return parser.parse(meeting)
    })
}

module.exports = {
  checksum: checksum,
  GETAction: GETAction,
}
