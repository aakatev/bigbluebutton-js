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

function getUrl(host, salt, action, params) {
  params.checksum = checksum(action, params, salt)
  return `${host}/api/${action}?${querystring.encode(params)}`
}

function httpClient(url) {
  return axios(url)
    .then((response) => response.data)
    .then(function (meeting) {
      return parser.parse(meeting)
    })
}

module.exports = {
  checksum,
  httpClient,
  getUrl,
}
