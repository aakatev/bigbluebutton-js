# bigbluebutton-js

JavaScript layer to interact with BigBlueButton [API](https://docs.bigbluebutton.org/dev/api).

Features:

- Provides methods to construct URLs;
- Provides HTTP client that converts XML responses to JS objects.

## Installation

```bash
npm i bigbluebutton-js
```

## Usage

```javascript
const bbb = require('bigbluebutton-js')

// BBB_URL and BBB_SECRET can be obtained
// by running bbb-conf --secret on your BBB server
let api = bbb.api(BBB_URL, BBB_SECRET)

// api module itslef is responsible for constructing URLs
let meetingCreateUrl = api.administration.create('My Meeting', '1', {
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

// http method should be used in order to make calls
bbb.http(meetingCreateUrl).then((result) => {
  console.log(result)

  let moderatorUrl = api.administration.join('moderator', '1', 'supersecret')
  let attendeeUrl = api.administration.join('attendee', '1', 'secret')
  console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)

  let meetingEndUrl = api.administration.end('1', 'supersecret')
  console.log(`End meeting link: ${meetingEndUrl}`)
})
```

## Available Calls

Note that required parameters should be passed as function arguments, while optional can be passed as options object. More information is available in this section of [BBB docs](https://docs.bigbluebutton.org/dev/api.html#api-calls).

### Administration

create - creates a new meeting.

Parameters

| Parameter   | Required/Otional |
| ----------- | ---------------- |
| name        | required         |
| meetingId   | required         |
| attendeePW  | optional         |
| moderatorPW | optional         |
| welcome     | optional         |
| dialNumber  | optional         |
| name        | optional         |
| meetingId   | optional         |
