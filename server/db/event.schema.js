const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  date: {
    type: String
  }, 
  hour: {
    type: String
  },
  amPm: {
    type: String
  },
  displayName: {
    type: String
  }, 
  place_id: {
    type: String
  }, 
  place_name: {
    type: String
  }
}); 

module.exports = EventSchema;