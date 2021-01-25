const http = require('http');
const https = require('https');

const hostname = '0.0.0.0';
const port = 3000;

const BBB_URL = 'server-1.bbb.com'

const server = http.createServer((downstreamReq, downstreamRes) => {
  https.get({
    hostname: BBB_URL,
    port: 443,
    path: '/bigbluebutton' + downstreamReq.url,
    agent: false
  }, (upstreamRes) => {
    let buffer = ''
    upstreamRes.on('data', (data) => {
      buffer += data
    })

    upstreamRes.on('end', () => {
      downstreamRes.statusCode = 200;
      downstreamRes.setHeader('Content-Type', 'text/plain');
      downstreamRes.end(buffer);
    })
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
