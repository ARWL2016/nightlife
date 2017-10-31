const express =   require('express');
const path =      require('path');
const winston =   require('winston');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));

app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
});