#### Code Cleanup 
1. Add IIFEs to front end JS; create controller on global app
2. refactor controller declarations 
3. rename folders
4. tidy up index.html 
5. setup controllerAs on routes not templates 
6. add docs 
7. add babel



https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app 

Geolocation 
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation


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



