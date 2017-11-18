const controllers = require('../controllers');

module.exports = (app) => {

  app.post('/api/diary/add', controllers.addToDiary);
  app.get('/api/diary/events/user?', controllers.getEventsByUser);
  app.post('/api/diary/delete', controllers.deleteEvent);
}