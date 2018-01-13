const mongoose = require('mongoose');
const EventSchema = require('./event.schema');

const LocationSchema = new mongoose.Schema({
  formatted_address: {
    type: String
  },   
  name: {
    type: String
  },  
  opening_hours: {
    weekday_text: [String]
  },  
  photohref: {
    type: String
  },  
  place_id: {
    type: String
  },  
  rating: {
    type: Number
  },  
  types: {
    type: String
  },  
  url: {
    type: String
  },  
  vicinity: {
    type: String
  },  
  website: {
    type: String
  }, 
  events: [EventSchema] 
  
  

}); 

module.exports = LocationSchema;