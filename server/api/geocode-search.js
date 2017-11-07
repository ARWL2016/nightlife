const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_GEOCODE_URL;
const params = {key: process.env.GEOCODE_API_KEY};

function getLocation(req, res) {
  params.address = req.query.address;

  const url = buildUrl(baseUrl, '' ,params);

  console.log({url});

  rp(url)
    .then(resp => {
      console.log(JSON.parse(resp));
      res.send(resp);
    })
    .catch(e => res.send(e));
}

module.exports = { getLocation };