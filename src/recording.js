'use strict'

const util = require('./util')

function recording(host, salt) {
  function getRecordings(kwparams) {
    kwparams = { ...kwparams }

    return util.constructUrl(host, salt, 'getRecordings', kwparams)
  }
  function publishRecordings(recordID, publish) {
    let qparams = {
      recordID: recordID,
      publish: publish,
    }

    return util.constructUrl(host, salt, 'publishRecordings', qparams)
  }
  function deleteRecordings(recordID) {
    let qparams = {
      recordID: recordID,
    }

    return util.constructUrl(host, salt, 'deleteRecordings', qparams)
  }
  function updateRecordings(recordID, kwparams) {
    kwparams = { ...kwparams }

    kwparams.recordID = recordID

    return util.constructUrl(host, salt, 'updateRecordings', kwparams)
  }
  return {
    getRecordings,
    publishRecordings,
    deleteRecordings,
    updateRecordings,
  }
}

module.exports = recording
