const api = require('../api');

module.exports = (app) => {
  app.get('/api/data/info?', api.textSearch);
  app.get('/api/data/details?', api.getDetails);
  app.get('/api/data/location?', api.getLocation);
  app.get('/api/data/photo?', api.getPhoto);
};