

const util = require('util');

function addToDiary(req, res) {
  console.log('************ ADD TO DIARY **********************');
  console.log(req.body);
  // console.log(util.inspect(req, {depth: 0}));
  
  
}

module.exports = {addToDiary};