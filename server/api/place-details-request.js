const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

// const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?';
const path = '/details/json?';
const params = {
  placeid : 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  key: process.env.API_KEY
};

const url = buildUrl(process.env.BASE_URL, path, params);

console.log(url);

// rp(url).then(result => {
//   console.log(result);
// }).catch(err => {
//   console.log(err);
// });
