const request = require('request-promise');

(async () => {
  console.log('Iniciando request')
  let status = await request('https://httpbin.org/status/200')
  debugger // hay que escribit estus en la consola de depuracion
})()
