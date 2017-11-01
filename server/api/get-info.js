const request = require('request');
const rp = require('request-promise');

const { buildUrl } = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/textsearch/json?';
const params = {
  key: process.env.API_KEY
}

function getInfo(query = "London mosques") {
  params.query = query;
  
  const url = buildUrl(baseUrl, path, params);

  // rp(url)   .then(result => {     console.log(result);   })   .catch(err => {
  //   console.log(err);   });

  console.log(url);
}

module.exports = { getInfo };

