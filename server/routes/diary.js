const controllers = require('../controllers');

module.exports = (app) => {

app.post('/api/diary/add', controllers.addToDiary);
}