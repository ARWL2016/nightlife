const mongoose = require('mongoose');
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

const UserSchema = new mongoose.Schema({
  facebookId: {
    type: String
  },  
  googleId: {
    type: String
  },
  displayName: {
    type: String
  }, 
  token: {
    type: String
  }

}); 

const User = mongoose.model('user', UserSchema); 

module.exports = {
  mongoose, 
  User
}