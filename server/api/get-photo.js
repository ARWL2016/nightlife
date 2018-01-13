/**
 * API requires photoref returned from text search - returns photo data
 * {@link https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=YOUR_API_KEY}
 */

const request = require('request');
const rp = require('request-promise');
const util = require('util');

const {buildUrl} = require('../utils');
const { logger } = require('../config/logger');

const baseUrl = process.env.BASE_URL;
const path = '/photo?';
const params = {
  key: process.env.API_KEY,
  maxwidth: 400
};

function getPhoto(req, res) {
  params.photoreference = req.query.photoref;
  const url = buildUrl(baseUrl, path, params);
  const options = {
    uri: url,
    resolveWithFullResponse: true    
  };

  rp(options)
    .then(data => {
      const href = data.request.href;
      logger.log(util.inspect(data.request, {colors: true, depth: 0}));
      res.status(200).send(href);
    })
    .catch(err => {
      logger.log(err);
      res.status(404).send(err);
    });
}

module.exports = { getPhoto };
