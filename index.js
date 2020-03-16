const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')

const URLS =[
'https://www.imdb.com/title/tt4154796/?ref_=nv_sr_srsg_0',
'https://www.imdb.com/title/tt0848228/?ref_=tt_sims_tt',
'https://www.imdb.com/title/tt2395427/?ref_=tt_sims_tt'
];

(async () => {
  let moviesDate = [];

  for(let movie of URLS) {
  const response = await request({
    uri: movie,
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
  let title = $('div[class="title_wrapper"] > h1').text().trim() // trim quita el espacio despues
  // let rating = $('span[itemprop="ratingValue"]').text() // nacho way
  let rating = $('div[class="ratingValue"] > strong >  span').text();
  let poster = $('div[class="poster"] > a > img').attr('src');
  let totalRating = $('div[class="imdbRating"] > a > span').text();
  let estreno = $('a[title="See more release dates"]').text().trim();

  let generos = [];
  $(`div[class="title_wrapper"] a[href^="/search/"]`).each((i, elm) => {
     let genre = $(elm).text();
     generos.push(genre);
  });

  let directores = [];
  $(`div[class="credit_summary_item"] a[href^="/name/"]`).each((i, elm) => {
     let genre = $(elm).text();
     directores.push(genre);
  });

moviesDate.push({
  title,
  rating,
  poster,
  totalRating,
  estreno,
  generos,
  directores
})
  // console.log(`Title: ${title}`);
  // console.log(`Rating: ${rating}`);
  // console.log(`Poster: ${poster}`);
  // console.log(`TotalRating: ${totalRating}`);
  // console.log(`Estreno: ${estreno}`);
  // console.log(`Generos: ${generos}`);
  // console.log(`Directores: ${directores}`);

  }
  fs.writeFileSync('./data.json', JSON.stringify(moviesDate), 'utf-8');

  console.log(moviesDate);
//  debug ger;
})()
