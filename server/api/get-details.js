const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/details/json?';
const params = { key: process.env.API_KEY };

// ChIJN1t_tDeuEmsRUsoyG83frY4 - example placeid

function getDetails(placeid){
  params.placeid = placeid;

  const url = buildUrl(baseUrl, path, params);

  console.log(url);

// rp(url).then(result => {
//   console.log(result);
// }).catch(err => {
//   console.log(err);
// });
}

module.exports = { getDetails };


