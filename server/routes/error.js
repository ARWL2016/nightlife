const controllers = require('../controllers');

module.exports = (app) => {
  app.post('/api/error/log', controllers.logError);

}