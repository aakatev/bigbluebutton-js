'use strict'

const axios = require('axios')
const querystring = require('querystring')
const crypto = require('crypto')
const parser = require('fast-xml-parser')

function getChecksum(callName, queryParams, sharedSecret) {
  return crypto
    .createHash('sha1')
    .update(`${callName}${querystring.encode(queryParams)}${sharedSecret}`)
    .digest('hex')
}

function constructUrl(host, salt, action, params) {
  params.checksum = getChecksum(action, params, salt)
  return `${host}/api/${action}?${querystring.encode(params)}`
}

function httpClient(url) {
  return axios(url, {
    headers: { Accept: 'text/xml, application/json, text/plain, */*' },
  })
    .then((response) => {
      return response.data
    })
    .then(function (xml) {
      return parser.parse(xml).response
    })
}

module.exports = {
  httpClient,
  constructUrl,
}
