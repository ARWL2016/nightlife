const { addToDiary, getEventsByUser, deleteEvent } = require('./diary');
const { logError } = require('./error');
const { getEnv } = require('./config');

module.exports = { addToDiary, getEventsByUser, deleteEvent, logError, getEnv };