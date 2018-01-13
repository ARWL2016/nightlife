const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/api/config/env', controllers.getEnv);
};