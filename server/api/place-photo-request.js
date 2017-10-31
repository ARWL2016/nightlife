const request = require('request');
const rp = require('request-promise');

const {buildUrl} = require('../utils');

const path = '/place/photo?';
const params = {
  maxwidth: 400, // 1-1600
  photoreference : 'CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU',
  key: process.env.API_KEY
};

const url = buildUrl(process.env.BASE_URL, path, params);

rp(url).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

console.log(url);