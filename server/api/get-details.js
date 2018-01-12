const request = require('request');
const rp = require('request-promise');

const { buildUrl } = require('../utils');

const baseUrl = process.env.BASE_URL;
const path = '/details/json?';
const params = { key: process.env.API_KEY };

function getDetails(req, res) {

  params.placeid = req.query.placeid;

  const url = buildUrl(baseUrl, path, params);

  console.log({ url });

  rp(url)
    .then(data => {
      // const data = JSON.parse(response[0]);
      console.log('*******************  RESPONSE');
      // console.log(response);
      res.status(200).send(data);
    })
    .catch(e => {
      console.log(e); 
      res.status(500).send(err);
    });


}

module.exports = { getDetails };


