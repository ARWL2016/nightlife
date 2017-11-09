https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app 
https://www.yelp.com/developers/documentation/v3/authentication 

Geolocation 
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

#### User Stories 
User Story: As an unauthenticated user, I can view all bars in my area.
User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.
User Story: As an unauthenticated user, when I login I should not have to search again.

Google Places API

https://developers.google.com/places/web-service/search#PlaceSearchRequests 

Nearby Search 
https://maps.googleapis.com/maps/api/place/nearbysearch/json
?location=-33.8670522,151.1957362 req
&radius=500&type=restaurant req
&keyword=cruise
&key=YOUR_API_KEY req

Text Search

req - query, key

https://maps.googleapis.com/maps/api/place/textsearch/json?
query=123+main+street&
key=YOUR_API_KEY

https://maps.googleapis.com/maps/api/place/textsearch/json?
query=123+main+street&
location=42.3675294,-71.186966&radius=10000&
key=YOUR_API_KEY

Place Details (requires ID from previous)

https://maps.googleapis.com/maps/api/place/details/json?
placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&
key=YOUR_API_KEY

Geocode 
https://maps.googleapis.com/maps/api/geocode/json?address=london%22


Place Photos 

https://maps.googleapis.com/maps/api/place/photo?
maxwidth=400& photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY

ng-click="svm.getDetails(result.place_id, result.photos[0].photo_reference)" 
 ng-click="svm.getPhoto(result.photos[0].photo_reference)"

http://jsfiddle.net/2ZzZB/56/

Google OAuth
https://github.com/jaredhanson/passport-google-oauth2 
https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
https://github.com/passport/express-4.x-facebook-example/blob/master/server.js 
https://scotch.io/tutorials/easy-node-authentication-google 

Tutorials
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context 

To do :  
- add auto completion (and auto detection?) to place search - and get location data
- add British English options
- add authentication 
- add going method
- make design responsive