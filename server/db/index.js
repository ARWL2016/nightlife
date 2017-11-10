const mongoose = require('mongoose');
const UserSchema = require('./user-schema');
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

module.exports = {
  mongoose, 
  User
}