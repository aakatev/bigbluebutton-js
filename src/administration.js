'use strict'

const util = require('./util')

function administration(options) {
  function create(name, id, kwparams) {
    kwparams = { ...kwparams }
    kwparams.name = name
    kwparams.meetingID = id

    return util.constructUrl(options, 'create', kwparams)
  }
  function join(fullName, meetingID, password, kwparams) {
    kwparams = { ...kwparams }
    kwparams.fullName = fullName
    kwparams.meetingID = meetingID
    kwparams.password = password

    return util.constructUrl(options, 'join', kwparams)
  }
  function end(meetingID, password) {
    let kwparams = {
      meetingID: meetingID,
      password: password,
    }
    return util.constructUrl(options, 'end', kwparams)
  }
  return {
    create,
    join,
    end,
  }
}

module.exports = administration
