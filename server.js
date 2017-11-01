require('dotenv').config();

const express =   require('express');
const path =      require('path');
const winston =   require('winston');

const { getInfo } = require('./server/api/get-info');
const { getPhoto } = require('./server/api/get-photo');
const { getDetails } = require('./server/api/get-details');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));

// text search route
searchByQuery();

// photorequestroute
getPhoto();

// details route
getPlaceDetails();

app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
});