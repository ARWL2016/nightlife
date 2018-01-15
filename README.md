### Pathfinder App 

https://arwl-pathfinder.herokuapp.com/#!/search 

Pathfinder is a web app which allows users to search for information on restaurants, shops, hospitals and many other kinds of location using various google APIs. Users can save a favorite location. Users can also log in using a Facebook or Google account and add a location and time to their diary. 

https://pathfinder-2017.herokuapp.com/auth/{{vendor}}/callback


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

#### Run the app in dev mode
- `npm run build:watch` - compile the front end source code in watch mode using babel 
- `npm run server` - run the express server in watch mode
- `npm run dev` - run the previous two commands concurrently 

#### Production build
- `npm run build:prod` - run babel build with minification 
- `npm run start`

#### Resources 
- http://www.passportjs.org/packages/
- https://developers.facebook.com/ 
- https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md 
- https://mlab.com/home 
- http://tobiasahlin.com/spinkit/ - css loaders / spinners

#### Notes 
- to load in IE or Edge, use: `http://127.0.0.1:3000`
- css files are kept next to controllers for convenience but are global - use namespacing to apply style rules locally
- fb OAuth does not return a consistent id, so currently using displayName for identifying users
- tested with: Chrome, Opera, Edge, IE11
- for testing Twitter oauth locally, use 127.0.0.1 in env and address bar - Twitter app management will not accept localhost

#### Todos
- local storage set item should be wrapped in try / catch if data may exceed limit - check
- can we log in and out without reloading the page?
- diary controller needs review
- improve diary service

Goals: 
- fe checklist
- retest all functionality


 





