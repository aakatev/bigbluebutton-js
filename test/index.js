require('dotenv').config()
var bbb = require('../')
var server = bbb.server(process.env.BBB_URL, process.env.BBB_SECRET)
const util = require('util')

var extra_params = {
  record: true,
  duration: 1,
  attendeePW: 'customAttendeePassword',
  moderatorPW: 'customModeratorPassword',
}
var room = server.administration.create(
  'Example Room',
  'someroomid',
  extra_params
)

room.then(function (meeting) {
  console.log(util.inspect(meeting, { showHidden: false, depth: null }))

  var response = meeting.response
  console.log(
    'Use this url to enter as a moderator: ' +
      server.administration.join(
        'Someone Special',
        response.meetingID[0],
        response.moderatorPW[0]
      )
  )

  console.log(
    'Use this url to enter as an attendee: ' +
      server.administration.join(
        'Not so Special',
        response.meetingID[0],
        response.attendeePW[0]
      )
  )
})
