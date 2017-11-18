https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app 

Geolocation 
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

#### User Stories 
User Story: As an unauthenticated user, I can view all bars in my area.
User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.
User Story: As an unauthenticated user, when I login I should not have to search again.

Google Places API


Place Details (requires ID from previous)

https://maps.googleapis.com/maps/api/place/details/json?
placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&
key=YOUR_API_KEY

Geocode 
https://maps.googleapis.com/maps/api/geocode/json?address=london%22


Place Photos 

https://maps.googleapis.com/maps/api/place/photo?
maxwidth=400& photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU
&key=YOUR_API_KEY

Google OAuth
https://scotch.io/tutorials/easy-node-authentication-google 

Tutorials
https://scotch.io/tutorials/easy-node-authentication-setup-and-local

To do :  
- add back button to details page (store search results on service)
- add animations
- add British English options
- add going method
- make design responsive
- add footer
- add ng-cloak to detail page
- add spinner to details page
- move logout link to profile

Bugs: 

- hours not always displaying

Important 
- fb OAuth does not apparently return a consistent id, so: 
- currently uses displayName for identifying users - not reliable 
- use email instead

https://stackoverflow.com/questions/9444745/javascript-how-to-get-tomorrows-date-in-format-dd-mm-yy



