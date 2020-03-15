const request = require('request-promise')
const cheerio = require('cheerio')

const URL = 'https://www.imdb.com/title/tt4154796/?ref_=nv_sr_srsg_0';
(async () => {
  const response = await request({
    uri: URL,
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'es,en-US;q=0.9,en;q=0.8,nl;q=0.7,ca;q=0.6,fr;q=0.5',
      'cache-control': 'max-age=0',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    },
    gzip: true
  }
  );

  // console.log(response)
  let $ = cheerio.load(response)
  // queremos el div con la class title_wrape y selecionamos el h1 y lo queremos en txt
  let title = $('div[class="title_wrapper"] > h1').text()
  // let rating = $('span[itemprop="ratingValue"]').text() // nacho way
  let rating = $('div[class="ratingValue"] > strong >  span').text();

  let director = $('div[class="credit_summary_item"] > a').text()
  console.log(title, rating)
  console.log(director)
})()
