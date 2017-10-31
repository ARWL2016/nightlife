require('dotenv').config();

const express =   require('express');
const path =      require('path');
const winston =   require('winston');

const { textSearch } = require('./server/api/text-search-request');

const app = express();
const port = process.env.PORT || 3000; 

app.set('baseUrl', 'https://maps.googleapis.com/maps/api/place');

app.use(express.static(path.join(__dirname, 'app')));

textSearch(app);

app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
});