const request = require('request');
const rp = require('request-promise');

const { buildUrl } = require('../utils');

const path = '/textsearch/json?';
const params = {
  query: 'London restaurants', 
  key: process.env.API_KEY
}

function textSearch(app) {
  const url = buildUrl(app, path, params);

  // rp(url)   .then(result => {     console.log(result);   })   .catch(err => {
  //   console.log(err);   });

  console.log(url);
}

module.exports = { textSearch };

