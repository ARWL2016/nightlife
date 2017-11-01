require('dotenv').config();

const express =   require('express');
const path =      require('path');
const winston =   require('winston');

const api = require('./server/api');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));

// text search route
app.get('/api/data/info?', api.getInfo);

// photorequestroute
app.get('/api/data/photo?', (req, res) => {
  getPhoto();
})

// details route
app.get('/api/data/details?', (req, res) => {
  getDetails();
});

app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
  
});