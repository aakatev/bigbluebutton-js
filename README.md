# bigbluebutton-js

JavaScript layer to interact with BigBlueButton [API](https://docs.bigbluebutton.org/dev/api). Supports [WebHooks](https://docs.bigbluebutton.org/dev/webhooks.html).

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

## WebHooks

This API allows third party applications to subscribe to a BBB meeting events. Events are propogated in form of HTTP Post requests. A list of events includes: a meeting was created, a user joined the meeting, a new presentation was uploaded, a user left the meeting, a recording is being processed, and some more.

Note, WebHooks is a separate application, and you will neen to install it on your BBB server first. You can do it by running:

```bash
sudo apt-get install bbb-webhooks
```

For more information consult BBB official [docs](https://docs.bigbluebutton.org/dev/webhooks.html).

## Available Calls

Note that required parameters should be passed as function arguments, while optional can be passed as options object. More information is available in this section of [BBB docs](https://docs.bigbluebutton.org/dev/api.html#api-calls).

---

### Administration

---

create - create a new meeting.

Parameters

| Parameter                          | Required/Otional |
| ---------------------------------- | ---------------- |
| name                               | required         |
| meetingId                          | required         |
| attendeePW                         | optional         |
| moderatorPW                        | optional         |
| welcome                            | optional         |
| dialNumber                         | optional         |
| voiceBridge                        | optional         |
| maxParticipants                    | optional         |
| logoutURL                          | optional         |
| record                             | optional         |
| duration                           | optional         |
| isBreakout                         | optional         |
| parentMeetingID                    | optional         |
| sequence                           | optional         |
| freeJoin                           | optional         |
| meta                               | optional         |
| moderatorOnlyMessage               | optional         |
| autoStartRecording                 | optional         |
| allowStartStopRecording            | optional         |
| webcamsOnlyForModerator            | optional         |
| logo                               | optional         |
| bannerText                         | optional         |
| bannerColor                        | optional         |
| copyright                          | optional         |
| muteOnStart                        | optional         |
| allowModsToUnmuteUsers             | optional         |
| lockSettingsDisableCam             | optional         |
| lockSettingsDisableMic             | optional         |
| lockSettingsDisablePrivateChat     | optional         |
| lockSettingsDisablePublicChat      | optional         |
| lockSettingsDisableNote            | optional         |
| lockSettingsLockedLayout           | optional         |
| lockSettingsLockOnJoin             | optional         |
| lockSettingsLockOnJoinConfigurable | optional         |
| guestPolicy                        | optional         |

---

join - join an existing meeting.

Parameters

| Parameter     | Required/Otional |
| ------------- | ---------------- |
| fullName      | required         |
| meetingId     | required         |
| password      | required         |
| createTime    | optional         |
| userID        | optional         |
| webVoiceConf  | optional         |
| configToken   | optional         |
| defaultLayout | optional         |
| avatarURL     | optional         |
| redirect      | optional         |
| clientURL     | optional         |
| joinViaHtml5  | optional         |
| guest         | optional         |

---

end - forcefully end an existing meeting.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| meetingId | required         |
| password  | required         |

---

### Monitoring

---

isMeetingRunning - check whether a meeting is running.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| meetingId | required         |

---

getMeetings - get the list of a existing meetings.

---

getMeetingInfo - get details of an existing meeting.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| meetingId | required         |

---

### Recording

---

getRecordings - get list of recordinngs.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| meetingId | optional         |
| recordID  | optional         |
| state     | required         |
| meta      | optional         |

---

publishRecordings - set publishing/unpublishing of a recording.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| recordID  | required         |
| publish   | required         |

---

deleteRecordings - delete an existing recording.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| recordID  | required         |

---

updateRecordings - update recording metadata.

Parameters

| Parameter | Required/Otional |
| --------- | ---------------- |
| recordID  | required         |
| meta      | optional         |

---

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Project started as a fork of [bbb-promise](https://www.npmjs.com/package/bbb-promise)
