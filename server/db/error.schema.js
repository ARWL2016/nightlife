const mongoose = require('mongoose'); 

const ErrorSchema = new mongoose.Schema({
  timestamp: {
    type: String, 
    required: true
  }, 
  origin: {
    type: String, 
    required: true
  }, 
  error: {
    type: String, 
    required: true
  }
});

module.exports = ErrorSchema; 