'use strict'

const util = require('./util')

function hooks(options) {
  function create(callbackURL, kwparams) {
    kwparams = { ...kwparams }
    kwparams.callbackURL = callbackURL

    return util.constructUrl(options, 'hooks/create', kwparams)
  }
  function destroy(hookID, kwparams) {
    kwparams = { ...kwparams }
    kwparams.hookID = hookID

    return util.constructUrl(options, 'hooks/destroy', kwparams)
  }
  function list(kwparams) {
    kwparams = { ...kwparams }
    return util.constructUrl(options, 'hooks/list', kwparams)
  }
  return {
    create,
    destroy,
    list,
  }
}

module.exports = hooks
