const request = require('request');
const rp = require('request-promise');
const pick = require('lodash.pick');

const { buildUrl } = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/textsearch/json?';
const params = {
  key: process.env.API_KEY
}

function getInfo(req, res) {
  params.query = req.query.q;
  
  const url = buildUrl(baseUrl, path, params);
  console.log(url);

  rp(url)   
    .then(result => {  
      res.send(result);
    })   
    .catch(err => {
      res.send({err});  
  });

}

module.exports = { getInfo };

