'use strict';(function(){'use strict';function a(a,b,c){return{textSearch:function(c){var d=c.category,e=c.query,f=c.coords;return e||(e=d),console.log({category:d,query:e}),a.get('/api/data/info?q='+e+'&type='+d+'&location='+f).then(function(a){if(200===a.status){var c=a.data.results;return 0<c.length&&b.saveResults(c,{category:d,query:e}),c}return Promise.reject()})},getDetails:function(b){return a.get('/api/data/details?placeid='+b).then(function(a){return a.data.result}).catch(function(a){c.logError('google-api.service.getDetails',a)})},getPhoto:function(b){return a.get('/api/data/photo?photoref='+b).then(function(a){return a.data}).catch(function(a){c.logError('google-api.service.getPhoto',a)})},getLocation:function(b){return a.get('/api/data/location?address='+b).then(function(a){return a.data.results}).catch(function(a){return c.logError('google-api-service.getLocation','location search error'),a})}}}angular.module('app').factory('googleApiService',a),a.$inject=['$http','localStorageService','errorService']})();