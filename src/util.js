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
      return parseXml(xml)
    })
}

function normalizeUrl(url) {
  return /\/$/.test(url) ? url.slice(0, -1) : url
}

function getPathname(url, host) {
  return url.replace(host, '')
}

function parseXml(xml) {
  const json = parser.parse(xml).response

  if(json.meetings) {
    let meetings = json.meetings ? json.meetings.meeting : []
    meetings = Array.isArray(meetings) ? meetings : [meetings]
    json.meetings = meetings
  }  
  if (json.recordings) {
    let recordings = json.recordings ? json.recordings.recording : []
    recordings = Array.isArray(recordings) ? recordings : [recordings]
    json.recordings = recordings
  }
  return json
}

module.exports = {
  httpClient,
  constructUrl,
  normalizeUrl,
  getPathname,
  parseXml,
}
