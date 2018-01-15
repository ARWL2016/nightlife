/**
 * {@link https://developers.google.com/places/web-service/search#PlaceSearchRequests}
 * text search: 
 * @param - key (reqd) 
 * @param - query - this is the search string, which could be a location or a type of establishment (option if type)
 * @param - type (opt) - select from a limited list of establishment types - see ref/types
 * @param - location (opt - but requires radius) - lat and lon on which to search
 */

const request = require('request');
const rp = require('request-promise');
const pick = require('lodash.pick');

const { buildUrl } = require('../utils');

const baseUrl = process.env.BASE_URL;

const path = '/textsearch/json?';
const params = {
  key: process.env.API_KEY
}

function textSearch(req, res) {
  params.query = req.query.q; // required parameter
  params.type = req.query.type || ''; // optional parameter
  params.location = req.query.location; 
  params.radius = 10000;
  
  const url = buildUrl(baseUrl, path, params);

  rp(url)   
    .then(result => {  
      res.send(result);
    })   
    .catch(err => {
      res.send({err});  
  });

}

module.exports = { textSearch };

