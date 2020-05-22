'use strict'
const util = require('util')
const axios = require('axios')
const querystring = require('querystring')
const sha1 = require('sha1')
const xml2js = require('xml2js-es6-promise')

function checksum(callName, qparams, salt) {
  let qstring = querystring.stringify(qparams)
  return sha1(callName + qstring + salt)
}

function GETAction(host, salt, action, params) {
  let cs = checksum(action, params, salt)

  params.checksum = cs

  let url = `${host}/api/${action}?${querystring.encode(params)}`
  let request = axios(url)

  return request
    .then((response) => response.data)
    .then(function (meeting) {
      return xml2js(meeting)
    })
}

module.exports = {
  checksum: checksum,
  GETAction: GETAction,
}
