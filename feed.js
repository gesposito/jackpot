const Promise = require('bluebird');
const request = require('request-promise-native');
const fs      = require("fs");

const URL     = 'http://www.gntn-pgd.it/gntn-info-web/rest/gioco/superenalotto/estrazioni/archivioconcorso';

let games     = [];

Promise.map([
  09, 10, 11, 12, 13, 14, 15, 16,
], (y) => {
  const year = 2000 + y;

  return Promise.map([
    01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12
  ], (month) => {
      return request.get(
        `${URL}/${year}/${month}`
      )
      // .pipe(fs.createWriteStream(`./data/${year}-${month}.json`));
  }, { 'concurrency': 1 })
  .then((result) => {
    result.map((game) => {
      games = games.concat(JSON.parse(game).concorsi);
    });
  })
}, { 'concurrency': 1 })
.then(
  () => fs.writeFile('./data/games.json', JSON.stringify(games), 'utf8')
);
