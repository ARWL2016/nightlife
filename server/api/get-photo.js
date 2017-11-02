
const request = require('request');
const rp = require('request-promise');
const util = require('util');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/photo?';
const params = {
  key: process.env.API_KEY,
  maxwidth: 400
};

function getPhoto(photoref) {
  params.photoreference = photoref;

  const url = buildUrl(baseUrl, path, params);

  const options = {
      uri: url,
      resolveWithFullResponse: true    
  };

  console.log({url});

  rp(options).then(response => {
    const href = response.request.href;
    
    console.log(util.inspect(response.request, {colors: true, depth: 0}));
    // res.send(href);
    Promise.resolve(href);
  }).catch(err => {
    console.log(err);
    Promise.reject(err);
    // res.send({err});
  });

  
}

module.exports = { getPhoto };
