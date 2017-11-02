const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const baseUrl = process.env.BASE_URL;
const detailPath = '/details/json?';
const photoPath = '/photo?';
const detailParams = { key: process.env.API_KEY };
const photoParams = { key: process.env.API_KEY, maxwidth: 400 };

// ChIJN1t_tDeuEmsRUsoyG83frY4 - example placeid

function getDetails(req, res) {
  detailParams.placeid = req.query.placeid;
  photoParams.photoreference = req.query.photoref;

  const detailUrl = buildUrl(baseUrl, detailPath, detailParams);
  const photoUrl = buildUrl(baseUrl, photoPath, photoParams)

  console.log({ detailUrl, photoUrl });

  // Promise.all([rp(detailUrl), rp(photoUrl)])
  //   .then(result => {
  //     console.log(result);
  //     res.send(result);
  //   })
  //   .catch(e => {
  //     console.log(e); 
  //     res.send({err});
  //   });

  // rp(url).then(result => {
  //   console.log(result);
  //   res.send(result);
  // }).catch(err => {
  //   res.send({err});
  // });
}

module.exports = { getDetails };


