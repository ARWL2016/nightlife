const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/place/photo?';
const params = {
  key: process.env.API_KEY,
};

function getPhoto(ref, maxwidth = 400) {
  params.maxwidth = maxwidth; 
  params.photoreference = ref;

  const url = buildUrl(baseUrl, path, params);

  // rp(url).then(result => {
  //   console.log(result);
  // }).catch(err => {
  //   console.log(err);
  // });

  console.log(url);
}

module.exports = { getPhoto };
