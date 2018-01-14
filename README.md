### Pathfinder App 

Pathfinder is a web app which allows users to search for information on restaurants, shops, hospitals and many other kinds of location using various google APIs. Users can save a favorite location. Users can also log in using a Facebook or Google account and add a location and time to their diary. 

#### Tech 
- angular 1.5.0 
- angular-route 1.5.0 
- node 8.9.3
- express 4.16
- mongodb 2.2
- mongoose 4.13 
- Google Places API Web Search - https://developers.google.com/places/web-service/search 
- OAuth: passport 0.4, passport-facebook, passport-google-oauth20
- build: npm, bower
- logging: winston 
- hosting: heroku, mlab

#### Run the app 
- `npm run build:watch` - compile the front end source code in watch mode using babel 
- `npm run server` - run the express server in watch mode
- `npm run dev` - run the previous two commands concurrently 

#### Resources 
- http://www.passportjs.org/packages/
- https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md 
- https://mlab.com/home 
- http://tobiasahlin.com/spinkit/ - css loaders / spinners

#### Notes 
- css files are kept next to controllers for convenience but are global - use namespacing to apply style rules locally
- fb OAuth does not return a consistent id, so currently using displayName for identifying users

#### Todos
- local storage set item should be wrapped in try / catch if data may exceed limit - check
- can we log in and out without reloading the page?
- diary controller needs review
- improve diary service

Goals: 
- fe checklist
- retest all functionality


 





