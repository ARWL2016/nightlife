/**
 *  Place details request (requires ID from textSearch): 
 *  {@link https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY}
 */

const request = require('request');
const rp = require('request-promise');

const { buildUrl } = require('../utils');
const { logger } = require('../config/logger');

const baseUrl = process.env.BASE_URL;
const path = '/details/json?';
const params = { key: process.env.API_KEY };

function getDetails(req, res) {

  params.placeid = req.query.placeid;
  const url = buildUrl(baseUrl, path, params);

  rp(url)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      logger.log(e);
      res.status(500).send(err);
    });
}

module.exports = { getDetails };


