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

function getPhoto(req, res) {

  params.photoreference = req.query.photoref;

  const url = buildUrl(baseUrl, path, params);

  console.log('photoUrl', url);

  const options = {
    uri: url,
    resolveWithFullResponse: true    
  };

  console.log({url});

  rp(options)
    .then(data => {
    const href = data.request.href;
    
    console.log(util.inspect(data.request, {colors: true, depth: 0}));
    res.status(200).send(href);

  }).catch(err => {
    console.log(err);
    res.status(404).send(err);
  });

  
}

module.exports = { getPhoto };

// to get photo href 
// const {href} = resp[1].request;