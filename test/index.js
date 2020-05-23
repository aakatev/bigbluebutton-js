require('dotenv').config()
const bbb = require('../')

let api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)

var options = {
  record: false,
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
}

let room = api.administration.create('Test Room', '1', options)

let moderator = api.administration.join('Moderator', '1', 'supersecret')
let attendee = api.administration.join('Attendee', '1', 'secret')

let meetingInfo = api.monitoring.getMeetingInfo('1')
let meetings = api.monitoring.getMeetings()

console.log(room, moderator, attendee, meetingInfo, meetings)
