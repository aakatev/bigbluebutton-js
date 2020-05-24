'use strict'

const util = require('./util')

function hooks(host, salt) {
  function create(callbackURL, kwparams) {
    kwparams = { ...kwparams }
    kwparams.callbackURL = callbackURL

    return util.constructUrl(host, salt, 'hooks/create', kwparams)
  }
  function destroy(hookID, kwparams) {
    kwparams = { ...kwparams }
    kwparams.hookID = hookID

    return util.constructUrl(host, salt, 'hooks/destroy', kwparams)
  }
  function list(kwparams) {
    kwparams = { ...kwparams }
    return util.constructUrl(host, salt, 'hooks/list', kwparams)
  }
  return {
    create,
    destroy,
    list,
  }
}

module.exports = hooks
