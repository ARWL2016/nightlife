// Connect to MLab cloud database and create data models 

const mongoose = require('mongoose');
const UserSchema = require('./user.schema');
const LocationSchema = require('./location.schema');
const EventSchema = require('./event.schema');
const ErrorSchema = require('./error.schema');
const {logger} =  require('../config/logger');

mongoose.Promise = global.Promise;

// create database connection with mongoose
const mlabURI = process.env.MLAB_URI
mongoose.connect(mlabURI); 

mongoose.connection.on('connected', () => {
  logger.log('info' ,`MONGOOSE URL: ${mlabURI}`);
}); 

mongoose.connection.on('error', (err) => {
  logger.log('error', `MONGOOSE ERROR: ${err}`); 
}); 

// create data models from abstract schemas 
const User = mongoose.model('user', UserSchema); 
const Location = mongoose.model('location', LocationSchema); 
const Event = mongoose.model('event', LocationSchema); 
const Error = mongoose.model('error', ErrorSchema);

module.exports = {
  mongoose, 
  User, 
  Location, 
  Event, 
  Error
}