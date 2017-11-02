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

// app.get('/api/data/details?', (req, res) => {
//   const data = fs.readFile(path.join(__dirname, '/ref/ledbury-details.json'), 'utf8', (err, data) => {
//     if (err) console.log(err); 
//     else {
//       res.send(data);
//     }
//   });
// });
// details route
app.get('/api/data/details?', api.getDetails);

// photorequestroute
app.get('/api/data/photo?', api.getPhoto);



app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
  
});