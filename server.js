if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const helmet = require('helmet'); 
const compression = require('compression');
const ms = require('ms');

const fs = require('fs');
const path = require('path');

const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { logger } = require('./server/config/logger');
const { mongoose } = require('./server/db');
require('./server/auth/auth.controller').configPassport(passport);

const app = express();
const port = process.env.PORT || 3000; 
const appDirectory = path.join(__dirname, 'client/dist');
const libDirectory = path.join(__dirname, 'client/bower_components');
const staticOptions = {maxAge: ms('1y')};

app.use(compression());
// app.use(helmet());
app.use(express.static(appDirectory, staticOptions));
app.use(express.static(libDirectory, staticOptions));

app.use(cookieParser());
// parse request body and add to req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true,
  secure: false, 
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

// import routes
require('./server/auth/auth.routes')(app, passport);
require('./server/routes/data')(app);
require('./server/routes/diary')(app);
require('./server/routes/error')(app);
require('./server/routes/config')(app);

app.listen(port, () => {
  logger.log('info', `SERVER PORT: ${port}`);
  logger.log('info', `SERVING APP FROM: ${appDirectory}`);
  logger.log('info', `SERVING LIB FROM: ${libDirectory}`);
  logger.log('info', `NODE_ENV: ${process.env.NODE_ENV}`);
});