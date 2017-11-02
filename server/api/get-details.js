const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const detailPath = '/details/json?';
const photoPath = '/photo?';
const detailParams = { key: process.env.API_KEY };
const photoParams = { key: process.env.API_KEY, maxwidth: 400 };

function getDetails(req, res) {
  detailParams.placeid = req.query.placeid;
  photoParams.photoreference = req.query.photoref;

  const detailUrl = buildUrl(baseUrl, detailPath, detailParams);
  const photoUrl = buildUrl(baseUrl, photoPath, photoParams);
  const photoOptions = {
    uri: photoUrl,
    resolveWithFullResponse: true
  };

  console.log({ detailUrl, photoUrl });

  Promise.all([rp(detailUrl), rp(photoOptions)])
    .then(resp => {
      const {href} = resp[1].request;
      console.log({href});
      const responseObj = JSON.parse(resp[0]);

      responseObj.result.photohref = href;
      console.log(responseObj);
      res.json(responseObj);
    })
    .catch(e => {
      console.log(e); 
      res.send({err});
    });


}

module.exports = { getDetails };


