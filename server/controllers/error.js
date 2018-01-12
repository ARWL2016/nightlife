const { Error } = require('../db');

function logError(req, res) {
  const payload = req.body; 
  
  Error.create(payload)
    .then(() => res.status(200).send('error logged'))
    .catch(err => res.status(500).send('error could not be logged'));
} 


module.exports = { logError }; 