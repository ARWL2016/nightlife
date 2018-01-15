/**
 *  Pass a location string such as 'London' and get back geocode data (lat and lon)
 *  {@link https://maps.googleapis.com/maps/api/geocode/json?address=london%22}
 */

const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_GEOCODE_URL;
const params = {key: process.env.GEOCODE_API_KEY};

function getLocation(req, res) {
  params.address = req.query.address;

  const url = buildUrl(baseUrl, '' ,params);

  rp(url)
    .then(resp => {
      res.send(resp);
    })
    .catch(e => res.send(e));
}

module.exports = { getLocation };