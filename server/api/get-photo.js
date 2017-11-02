
const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/photo?';
const params = {
  key: process.env.API_KEY,
  maxwidth: 400
};

function getPhoto(req, res) {
  params.photoreference = req.query.photoref;

  const url = buildUrl(baseUrl, path, params);
  console.log({url});

  rp(url).then(result => {
    console.log(result, typeof result);
    res.send(result);
  }).catch(err => {
    console.log(err);
  });

  
}

module.exports = { getPhoto };
