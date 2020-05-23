'use strict'

const util = require('./util')

function administration(host, salt) {
  function create(name, id, kwparams) {
    kwparams = { ...kwparams }
    kwparams.name = name
    kwparams.meetingID = id

    return util.constructUrl(host, salt, 'create', kwparams)
  }
  function join(fullName, meetingID, password, kwparams) {
    kwparams = { ...kwparams }
    kwparams.fullName = fullName
    kwparams.meetingID = meetingID
    kwparams.password = password

    return util.constructUrl(host, salt, 'join', kwparams)
  }
  function end(meetingID, password) {
    let kwparams = {
      meetingID: meetingID,
      password: password,
    }
    return util.constructUrl(host, salt, 'end', kwparams)
  }
  return {
    create,
    join,
    end,
  }
}

module.exports = administration
