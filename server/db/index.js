const mongoose = require('mongoose');
const UserSchema = require('./user.schema');
const LocationSchema = require('./location.schema');
const EventSchema = require('./event.schema');
const {logger} =  require('../config/logger');

mongoose.Promise = global.Promise;
const mlabURI = process.env.MLAB_URI
mongoose.connect(mlabURI); 

mongoose.connection.on('connected', () => {
  logger.log('info' ,`MONGOOSE URL: ${mlabURI}`);
}); 

mongoose.connection.on('error', (err) => {
  logger.log('error', `MONGOOSE ERROR: ${err}`); 
}); 

const User = mongoose.model('user', UserSchema); 
const Location = mongoose.model('location', LocationSchema); 
const Event = mongoose.model('event', LocationSchema); 

module.exports = {
  mongoose, 
  User, 
  Location, 
  Event
}