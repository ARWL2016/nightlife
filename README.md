### Pathfinder App 

https://arwl-pathfinder.herokuapp.com/#!/search 

Pathfinder is a web app which allows users to search for information on restaurants, shops, hospitals and many other kinds of location using google APIs. Users can save a favorite location. Users can also log in using a Google, Twitter or Github account and add a location and time to their diary. 

#### Tech 
- angular 1.5.0 
- angular-route 1.5.0 
- node 8.9.3
- express 4.16
- mongodb 2.2
- mongoose 4.13 
- Google Places API Web Search - https://developers.google.com/places/web-service/search 
- OAuth: passport 0.4, passport-twitter, passport-google-oauth20, passport-github
- build: npm, bower, babel
- logging: winston 
- hosting: heroku, mlab

#### Tech notes 
- uses mixture of angular controller and component styles
- data served from four Google API services: Text Search, Place Details, Place Photos and Geocode
- social login uses Google, Twitter and Github OAuth
- cloud data provider MLab used for development and production
- responsive CSS design
- uses browser caching of search results (local storage) for better UX
- client side errors logged to MLab
- written in ES6: client-side code transpiled to ES5 and minified with babel

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
- tested with: Chrome, Opera, Edge, IE11
- for testing Twitter oauth locally, use 127.0.0.1 in env and address bar - Twitter app management will not accept localhost

#### Todos
- local storage set item should be wrapped in try / catch if data can exceed limit - check
- improve diary service



 





