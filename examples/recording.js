require('dotenv').config()

const bbb = require('../src');
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
const http = bbb.http

let recordingUrl = api.recording.getRecordings({recordID: 'd7378d529893776cb60a97444d89840f2e0eff70-1603169848239'})

let run = async () => {
  let result = await http((recordingUrl))
  console.log(JSON.stringify(result))
}

run()