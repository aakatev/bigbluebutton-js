'use strict'

const axios = require('axios')
const querystring = require('querystring')
const crypto = require('hash.js')
const parser = require('fast-xml-parser')

function getChecksum(callName, queryParams, sharedSecret) {
  return crypto
    .sha1()
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

function normalizeUrl(url) {
  return /\/$/.test(url) ? url.slice(0, -1) : url
}

function getPathname(url, host) {
  return url.replace(host, '')
}

module.exports = {
  httpClient,
  constructUrl,
  normalizeUrl,
  getPathname,
}
