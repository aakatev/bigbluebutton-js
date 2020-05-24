require('dotenv').config()
const bbb = require('../')
const assert = require('assert')
const TEST_HOOKS_TIMEOUT = 6000

let api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
let http = bbb.http

describe('Hooks Module Tests', () => {
  let hookID
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return http(api.hooks.create('https://mysite.com')).then((response) => {
      hookID = response.hookID
    })
  })
  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return http(api.hooks.destroy(hookID))
  })

  it('Get Hooks', () => {
    return http(api.hooks.list(hookID)).then((response) => {
      assert.equal(response.returncode, 'SUCCESS')
      assert.equal(response.hooks.hook.hookID, hookID)
    })
  })
})

describe('Administration and Monitoring Modules Tests', () => {
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return http(
      api.administration.create('Test Meeting', '42', { duration: 1 })
    )
  })
  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return http(api.administration.end('42'))
  })

  it('Get Meetings', () => {
    return http(api.monitoring.getMeetingInfo('42')).then((response) => {
      assert.equal(response.returncode, 'SUCCESS')
      assert.equal(response.meetingName, 'Test Meeting')
      assert.equal(response.meetingID, '42')
      assert.equal(response.duration, 1)
    })
  })
})
