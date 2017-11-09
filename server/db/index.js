const mongoose = require('mongoose');
const chalk = require('chalk') ;

mongoose.Promise = global.Promise;
const mlabURI = process.env.MLAB_URI
mongoose.connect(mlabURI); 

mongoose.connection.on('connected', () => {
  console.log(chalk.green('mongoose connected to: ' + mlabURI));
}); 

mongoose.connection.on('error', (err) => {
  console.log(chalk.red('mongoose connection error: ' + err)); 
}); 

const UserSchema = new mongoose.Schema({
  facebookId: {
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