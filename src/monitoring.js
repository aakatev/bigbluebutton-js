'use strict'

const util = require('./util')

function monitoring(options) {
  function getMeetingInfo(meetingID) {
    let qparams = {
      meetingID: meetingID,
    }

    return util.constructUrl(options, 'getMeetingInfo', qparams)
  }
  function isMeetingRunning(meetingID) {
    let qparams = {
      meetingID: meetingID,
    }

    return util.constructUrl(options, 'isMeetingRunning', qparams)
  }
  function getMeetings() {
    let qparams = {}

    return util.constructUrl(options, 'getMeetings', qparams)
  }
  return {
    getMeetingInfo,
    isMeetingRunning,
    getMeetings,
  }
}

module.exports = monitoring
