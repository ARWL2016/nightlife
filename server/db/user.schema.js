const mongoose = require('mongoose');
const EventSchema = require('./event.schema');

const UserSchema = new mongoose.Schema({
  oauthid: {
    type: Number
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