### Pathfinder App 

Caching 
User stories: 
- when the user navigates back to the search page, the previous search will be available
- on app start up, the cache will be clear
- when the user changes location, the cache will be cleared

How?
- create cache service with post, get, delete methods V
- cache will store results + query (location not needed)  V
- on the controller init, check for the cache and render the results and populate the inputs V
- when the textsearch returns, the results will be cached with the query



#### Useful links: 
- https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md 

#### Code Cleanup  
- add docs 
- make controller syntax consistent

#### Bugs: 
- logout does not clear localstorage
- hours not always displaying
- all events deleting at once
- local storage set item should be wrapped in try / catch
- results categories weirdly formatted

#### Google Places API

Place Details (requires ID from previous): 
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


To do :  
- add back button to details page (store search results on service)
- add animations
- add going method
- make design responsive
- add footer
- add ng-cloak to detail page
- add spinner to details page
- move logout link to profile



Important 
- fb OAuth does not apparently return a consistent id, so: 
- currently uses displayName for identifying users - not reliable 
- use email instead





