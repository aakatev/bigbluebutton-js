'use strict'

const util = require('./util')
const querystring = require('querystring')

function administration(host, salt) {
  let admin = {
    host: host,
    salt: salt,
    create: function (name, id, kwparams) {
      kwparams = { ...kwparams }
      kwparams.name = name
      kwparams.meetingID = id

      return util.GETAction(this.host, this.salt, 'create', kwparams)
    },
    join: function (fullName, meetingID, password, kwparams, changeUrl) {
      kwparams = { ...kwparams }
      kwparams.fullName = fullName
      kwparams.meetingID = meetingID
      kwparams.password = password

      let cs = util.checksum('join', kwparams, this.salt)
      kwparams.checksum = cs
      let qstring = querystring.stringify(kwparams)
      let uri = this.host + '/api/join' + '?' + qstring

      if (changeUrl) {
        uri = changeUrl + '/api/join' + '?' + qstring
      }

      return uri
    },
    end: function (meetingID, password) {
      let qparams = {
        meetingID: meetingID,
        password: password,
      }

      return util.GETAction(this.host, this.salt, 'end', qparams)
    },
    customCall: function (callName, params) {
      params = { ...params }

      return util.GETAction(this.host, this.salt, callName, params)
    },
  }

  return admin
}

module.exports = administration
