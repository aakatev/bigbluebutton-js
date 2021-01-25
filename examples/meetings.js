require('dotenv').config()

const bbb = require('../src');
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
const http = bbb.http


let createUrlOne = api.administration.create("meeting-one", '1', {
  duration: 5,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

let createUrlTwo = api.administration.create("meeting-two", '2', {
  duration: 5,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

let endUrlOne = api.administration.end("1", "supersecret")

let endUrlTwo = api.administration.end("2", "supersecret")

let infosUrl = api.monitoring.getMeetings()

let run = async () => {
  await http(createUrlOne)
  await http(createUrlTwo)
  let result = await http((infosUrl))
  console.log(JSON.stringify(result))
  await http(endUrlOne)
  await http(endUrlTwo)
}

run()