const mongoose = require('mongoose');

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

module.exports = UserSchema;