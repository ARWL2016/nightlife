const mongoose = require('mongoose');
const EventSchema = require('./event.schema');

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
  }, 
  events: [EventSchema] 

}); 

module.exports = UserSchema;