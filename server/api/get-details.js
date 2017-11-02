const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/details/json?';
const params = { key: process.env.API_KEY };

// ChIJN1t_tDeuEmsRUsoyG83frY4 - example placeid

function getDetails(req, res) {
  params.placeid = req.query.placeid;

  const url = buildUrl(baseUrl, path, params);

  console.log(url);

  // rp(url).then(result => {
  //   res.send(result);
  // }).catch(err => {
  //   res.send({err});
  // });
}

module.exports = { getDetails };


