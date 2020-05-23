'use strict'

const util = require('./util')

function monitoring(host, salt) {
  function getMeetingInfo(meetingID) {
    let qparams = {
      meetingID: meetingID,
    }

    return util.getUrl(host, salt, 'getMeetingInfo', qparams)
  }
  function isMeetingRunning(meetingID) {
    let qparams = {
      meetingID: meetingID,
    }

    return util.getUrl(host, salt, 'isMeetingRunning', qparams)
  }
  function getMeetings() {
    let qparams = {}

    return util.getUrl(host, salt, 'getMeetings', qparams)
  }
  return {
    getMeetingInfo,
    isMeetingRunning,
    getMeetings,
  }
}

module.exports = monitoring
