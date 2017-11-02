require('dotenv').config();

const express =   require('express');
const path =      require('path');
const winston =   require('winston');
const fs =        require('fs');

const api = require('./server/api');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));

app.get('/api/data/info?', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, '/ref/text-search.json'), 'utf8'); 
  res.send(data);
});

// text search route
// app.get('/api/data/info?', api.getInfo);


// details route
app.get('/api/data/details?', api.getDetails);

// photorequestroute
app.get('/api/data/photo?', (req, res) => {
  getPhoto();
});



app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
  
});