# bigbluebutton-js <!-- omit in toc -->

JavaScript layer to interact with BigBlueButton [API](https://docs.bigbluebutton.org/dev/api). Supports [WebHooks](https://docs.bigbluebutton.org/dev/webhooks.html).

## Overview <!-- omit in toc -->

The document has several parts:

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [API Calls Example](#api-calls-example)
  - [WebHooks](#webhooks)
  - [WebHooks Example](#webhooks-example)
- [Available Calls](#available-calls)
  - [Administration](#administration)
    - [create - create a new meeting](#create---create-a-new-meeting)
    - [join - join an existing meeting](#join---join-an-existing-meeting)
    - [end - forcefully end an existing meeting](#end---forcefully-end-an-existing-meeting)
  - [Monitoring](#monitoring)
    - [isMeetingRunning - check whether a meeting is running](#ismeetingrunning---check-whether-a-meeting-is-running)
    - [getMeetings - get the list of existing meetings](#getmeetings---get-the-list-of-existing-meetings)
    - [getMeetingInfo - get details of an existing meeting](#getmeetinginfo---get-details-of-an-existing-meeting)
  - [Recording](#recording)
    - [getRecordings - get list of recordinngs](#getrecordings---get-list-of-recordinngs)
    - [publishRecordings - set publishing/unpublishing of a recording](#publishrecordings---set-publishingunpublishing-of-a-recording)
    - [deleteRecordings - delete an existing recording](#deleterecordings---delete-an-existing-recording)
    - [updateRecordings - update recording metadata](#updaterecordings---update-recording-metadata)
  - [WebHooks](#webhooks-1)
    - [create - create a new hook](#create---create-a-new-hook)
    - [destroy - remove an existing hook](#destroy---remove-an-existing-hook)
    - [list - list existing hooks](#list---list-existing-hooks)
- [Tests](#tests)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- Supports BBB API, and WebHooks;
- Provides methods to construct URLs, and calculate SHA checksum;
- Provides HTTP client that converts XML responses to JS objects.

## Installation

```bash
npm i bigbluebutton-js
```

## Usage

### API Calls Example

```javascript
const bbb = require('bigbluebutton-js')

// BBB_URL and BBB_SECRET can be obtained
// by running bbb-conf --secret on your BBB server
let api = bbb.api(BBB_URL, BBB_SECRET)
let http = bbb.http

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

### WebHooks

This API allows third party applications to subscribe to a BBB meeting events. Events are propogated in form of HTTP POST requests. A list of events includes: a meeting was created, a user joined the meeting, a new presentation was uploaded, a user left the meeting, a recording is being processed, and some more.

Note, WebHooks is a separate application, and you will neen to install it on your BBB server first. You can do it by running:

```bash
sudo apt-get install bbb-webhooks
```

### WebHooks Example

This example is using [express](https://www.npmjs.com/package/express) as a subscribed server. In reality, you can use any endpoint listenning to HTTP POST requests.

First, you create your hook on BBB server. Let's say your POST endpoint is listenning at `https://mysite.com/bbb/hooks`, then the script will look the following way:

```javascript
const bbb = require('bigbluebutton-js')

// BBB_URL and BBB_SECRET can be obtained
// by running bbb-conf --secret on your BBB server
let api = bbb.api(BBB_URL, BBB_SECRET)

bbb
  .http(api.hooks.create('https://mysite.com/bbb/hooks'))
  .then(console.log)
  .catch(console.log)
```

Example of the POST endpoint:

```javascript
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/bbb/hooks', function (req, res) {
  let event = JSON.parse(req.body.event)

  // Expand json before loging it
  console.log(
    require('util').inspect(event, { showHidden: false, depth: null })
  )
  res.json({})
})

app.listen(3001)
```

For more information consult BBB official [docs](https://docs.bigbluebutton.org/dev/webhooks.html).

## Available Calls

Note that required parameters should be passed as function arguments, while optional can be passed as options object. More information is available in this section of [BBB docs](https://docs.bigbluebutton.org/dev/api.html#api-calls).

### Administration

#### create - create a new meeting

Parameters

| Parameter                          | Description                                                      | Required/Otional         |
| ---------------------------------- | ---------------------------------------------------------------- | ------------------------ |
| name                               | Meeting name                                                     | required                 |
| meetingId                          | Meeting ID                                                       | required                 |
| attendeePW                         | Attendee password                                                | optional                 |
| moderatorPW                        | Moderator password                                               | optional                 |
| welcome                            | Chat welcome message                                             | optional                 |
| dialNumber                         | Cell phone access number                                         | optional                 |
| voiceBridge                        | FreeSWITCH voice conference number                               | optional                 |
| maxParticipants                    | Maximum maximum number of participants                           | optional                 |
| logoutURL                          | Redirect URL after logout                                        | optional                 |
| record                             | Enable/disable meeting record                                    | optional                 |
| duration                           | Meeting maximum duration                                         | optional                 |
| isBreakout                         | `true` for a breakout rooms                                      | required (breakout room) |
| parentMeetingID                    | Top-level meeting id of the breakout room                        | required (breakout Room) |
| sequence                           | Breakout room sequence number                                    | required (breakout Room) |
| freeJoin                           | `true` allows user to have a choice of a breakout room to join   | optional (breakout Room) |
| meta                               | Meeting metadata                                                 | optional                 |
| moderatorOnlyMessage               | Moderator only chat message                                      | optional                 |
| autoStartRecording                 | `true` will instruct to start recording on first user join       | optional                 |
| allowStartStopRecording            | Allow users to start/stop recordings                             | optional                 |
| webcamsOnlyForModerator            | Users webcams are only seeing by moderators                      | optional                 |
| logo                               | Default logo in Flash client                                     | optional                 |
| bannerText                         | Banner text                                                      | optional                 |
| bannerColor                        | Banner background color                                          | optional                 |
| copyright                          | Copyright text                                                   | optional                 |
| muteOnStart                        | Mute all users on meeting start                                  | optional                 |
| allowModsToUnmuteUsers             | Allow moderators to unmute users                                 | optional                 |
| lockSettingsDisableCam             | `true` will prevent users from sharing webcams                   | optional                 |
| lockSettingsDisableMic             | `true` will prevent users from sharing microphones               | optional                 |
| lockSettingsDisablePrivateChat     | `true` will disable private chats                                | optional                 |
| lockSettingsDisablePublicChat      | `true` will disable public chat                                  | optional                 |
| lockSettingsDisableNote            | `true` will disable notes                                        | optional                 |
| lockSettingsLockedLayout           | `true` will lock meeting layout                                  | optional                 |
| lockSettingsLockOnJoin             | `false` will disable applying settings                           | optional                 |
| lockSettingsLockOnJoinConfigurable | `true` will allow applying `lockSettingsLockOnJoin`              | optional                 |
| guestPolicy                        | Possible values: `ALWAYS_ACCEPT`, `ALWAYS_DENY`, `ASK_MODERATOR` | optional                 |

#### join - join an existing meeting

Parameters

| Parameter     | Description                                                                                            | Required/Otional        |
| ------------- | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| fullName      | Users full name                                                                                        | required                |
| meetingId     | Meeting ID                                                                                             | required                |
| password      | Attendee/moderator password                                                                            | required                |
| createTime    | If provided, parameter should match meeting `createTime`                                               | optional                |
| userID        | User ID                                                                                                | optional                |
| webVoiceConf  | Custom voip voice extension                                                                            | optional                |
| configToken   | Apply custom configuration associated with the token                                                   | optional                |
| defaultLayout | Layout to load on user join                                                                            | optional                |
| avatarURL     | Link to user avatar ([#8566](https://github.com/bigbluebutton/bigbluebutton/issues/8566))              | optional                |
| redirect      | Custom redirect behaviour of join API ([learn more](https://docs.bigbluebutton.org/dev/api.html#join)) | optional (experimental) |
| clientURL     | Display custom url ([learn more](https://docs.bigbluebutton.org/dev/api.html#join))                    | optional (experimental) |
| joinViaHtml5  | `true` to force HTML5                                                                                  | optional                |
| guest         | `true` for guest users                                                                                 | optional                |

#### end - forcefully end an existing meeting

Parameters

| Parameter | Description        | Required/Otional |
| --------- | ------------------ | ---------------- |
| meetingId | Meeting ID         | required         |
| password  | Moderator password | required         |

### Monitoring

#### isMeetingRunning - check whether a meeting is running

Parameters

| Parameter | Description | Required/Otional |
| --------- | ----------- | ---------------- |
| meetingId | Meeting ID  | required         |

#### getMeetings - get the list of existing meetings

#### getMeetingInfo - get details of an existing meeting

Parameters

| Parameter | Description | Required/Otional |
| --------- | ----------- | ---------------- |
| meetingId | Meeting ID  | required         |

### Recording

#### getRecordings - get list of recordinngs

Parameters

| Parameter | Description                                                                                               | Required/Otional |
| --------- | --------------------------------------------------------------------------------------------------------- | ---------------- |
| meetingId | Meeting ID                                                                                                | optional         |
| recordID  | Recordings record ID                                                                                      | optional         |
| state     | Recordings state (possible values: `processing`, `processed`, `published`,`unpublished`,`deleted`, `any`) | optional         |
| meta      | Recordings metadata                                                                                       | optional         |

#### publishRecordings - set publishing/unpublishing of a recording

Parameters

| Parameter | Description             | Required/Otional |
| --------- | ----------------------- | ---------------- |
| recordID  | Recordings record ID    | required         |
| publish   | `true` or `false` value | required         |

#### deleteRecordings - delete an existing recording

Parameters

| Parameter | Description          | Required/Otional |
| --------- | -------------------- | ---------------- |
| recordID  | Recordings record ID | required         |

#### updateRecordings - update recording metadata

Parameters

| Parameter | Description          | Required/Otional |
| --------- | -------------------- | ---------------- |
| recordID  | Recordings record ID | required         |
| meta      | Recordings metadata  | optional         |

### WebHooks

#### create - create a new hook

Parameters

| Parameter   | Description                         | Required/Otional |
| ----------- | ----------------------------------- | ---------------- |
| callbackURL | Callback URL to receive events      | required         |
| meetingID   | Meeting ID                          | optional         |
| getRaw      | `true` set events to be unprocessed | optional         |

#### destroy - remove an existing hook

Parameters

| Parameter | Description | Required/Otional |
| --------- | ----------- | ---------------- |
| hookID    | Hooks ID    | required         |

#### list - list existing hooks

Parameters

| Parameter | Description | Required/Otional |
| --------- | ----------- | ---------------- |
| meetingID | Meeting ID  | optional         |

## Tests

To run the test suites some prior configuration is required. First, create a `.env` file in library root. The file should have the following content:

```
BBB_URL=https://mysite.com/bigbluebutton
BBB_SECRET=MySuperSecretSharedToken
```

Make sure, you installed development dependencies ([mocha](https://www.npmjs.com/package/mocha), and [dotenv](https://www.npmjs.com/package/dotenv)). Now you can run `npm run test`:

```bash
npm run test
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Project started as a fork of [bbb-promise](https://www.npmjs.com/package/bbb-promise)
