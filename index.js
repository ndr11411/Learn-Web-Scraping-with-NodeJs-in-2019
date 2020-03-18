//   proxy: 'http://user:password@ip:port'

const request = require('request-promise').defaults({
  proxy: 'http://user:password@ip:port'
});

(async () => {
  let response = await request('https://httpbin.org/ip')
  debugger
})()
 