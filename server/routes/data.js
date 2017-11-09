const api = require('../api');

module.exports = (app) => {

  // development text-search data
// app.get('/api/data/info?', (req, res) => {
//   const data = fs.readFileSync(path.join(__dirname, '/ref/text-search.json'), 'utf8'); 
//   res.send(data);
// });

// production text search route
app.get('/api/data/info?', api.textSearch);


// details - DEV
// app.get('/api/data/details?', (req, res) => {
//   const data = fs.readFile(path.join(__dirname, '/ref/ledbury-details.json'), 'utf8', (err, data) => {
//     if (err) console.log(err); 
//     else {
//       res.send(data);
//     }
//   });
// });

// details route - PROD
app.get('/api/data/details?', api.getDetails);

app.get('/api/data/location?', api.getLocation);

// photorequestroute
app.get('/api/data/photo?', api.getPhoto);
}