const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt4154796/?ref_=nv_sr_srsg_0';
(async () => {
  const response = await request(URL);
 // console.log(response)
 let $ = cheerio.load(response);
 // queremos el div con la class title_wrape y selecionamos el h1 y lo queremos en txt
 let title = $('div[class="title_wrapper"] > h1').text();
 let rating = $('span[itemprop="ratingValue"]').text();
 let director = $('div[class="credit_summary_item"] > a').text();
 console.log(title, rating, director);

})()
