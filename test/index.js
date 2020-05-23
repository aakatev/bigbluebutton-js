require('dotenv').config()
var bbb = require('../')

var server = bbb.server(process.env.BBB_URL, process.env.BBB_SECRET)

var options = {
  record: false,
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
}

let room = server.administration.create('Test Room', '1', options)

let moderator = server.administration.join('Moderator', '1', 'supersecret')
let attendee = server.administration.join('Attendee', '1', 'secret')

let meetingInfo = server.monitoring.getMeetingInfo('1')
let meetings = server.monitoring.getMeetings()

console.log(room, moderator, attendee, meetingInfo, meetings)
