const request = require('request-promise')
const cheerio = require('cheerio')

const URL = 'https://www.imdb.com/title/tt4154796/?ref_=nv_sr_srsg_0'
(async () => {
  const response = await request(URL)
  console.log(response)
})()
