require('dotenv').config()
const bbb = require('../')

let api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
let meeting = api.administration.create('Test Meeting', '1', options)

let moderator = api.administration.join('Moderator', '1', 'supersecret')
let attendee = api.administration.join('Attendee', '1', 'secret')

let meetingInfo = api.monitoring.getMeetingInfo('1')
let meetings = api.monitoring.getMeetings()

console.log(meeting, moderator, attendee, meetingInfo, meetings)
console.log(api.hooks.list())
