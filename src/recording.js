'use strict'

const util = require('./util')

function recording(options) {
  function getRecordings(kwparams) {
    kwparams = { ...kwparams }

    return util.constructUrl(options, 'getRecordings', kwparams)
  }
  function publishRecordings(recordID, publish) {
    let qparams = {
      recordID: recordID,
      publish: publish,
    }

    return util.constructUrl(options, 'publishRecordings', qparams)
  }
  function deleteRecordings(recordID) {
    let qparams = {
      recordID: recordID,
    }

    return util.constructUrl(options, 'deleteRecordings', qparams)
  }
  function updateRecordings(recordID, kwparams) {
    kwparams = { ...kwparams }

    kwparams.recordID = recordID

    return util.constructUrl(options, 'updateRecordings', kwparams)
  }
  return {
    getRecordings,
    publishRecordings,
    deleteRecordings,
    updateRecordings,
  }
}

module.exports = recording
