// send env to front end to configure error processing

function getEnv(req, res) {
  res.status(200).send(process.env.NODE_ENV);
} 

module.exports = { getEnv }; 