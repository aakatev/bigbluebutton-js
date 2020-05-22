'use strict'

const util = require('./util')

function monitoring(host, salt) {
  let mon = {
    host: host,
    salt: salt,
    getMeetingInfo: function (meetingID) {
      let qparams = {
        meetingID: meetingID,
      }

      return util.GETAction(this.host, this.salt, 'getMeetingInfo', qparams)
    },
    isMeetingRunning: function (meetingID) {
      let qparams = {
        meetingID: meetingID,
      }

      return util.GETAction(this.host, this.salt, 'isMeetingRunning', qparams)
    },
    getMeetings: function () {
      let qparams = {}

      return util.GETAction(this.host, this.salt, 'getMeetings', qparams)
    },
  }

  return mon
}

module.exports = monitoring
