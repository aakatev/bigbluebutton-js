require('dotenv').config()

const bbb = require('../src');
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
const http = bbb.http

let createUrlOne = api.administration.create("meeting-one", '1', {
  duration: 5,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

let endUrlOne = api.administration.end("1", "supersecret")

let infosUrl = api.monitoring.getMeetings()

let run = async () => {
  await http(createUrlOne)
  let result = await http((infosUrl))
  console.log(JSON.stringify(result))
  await http(endUrlOne)
}

run()