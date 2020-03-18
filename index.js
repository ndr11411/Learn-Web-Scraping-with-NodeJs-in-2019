const request = require('request-promise');

(async () => {
  console.log('Iniciando request')
  try {
    let status = await request({
      uri: 'https://httpbin.org/status/300',
      resolveWithFullResponse: true
    })
  } catch (response) {
    if(response.statusCode == 300){
      console.log("todo esta OK")
    }else {
      console.log(`Algo funciono mal: ${response}`)
      process.exit(1)
    }
    // debugger // hay que escribit estus en la consola de depuracion
  }
  // debugger
})()
