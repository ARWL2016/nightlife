'use strict';(function(){'use strict';function a(a,b,c,d,e,f,g){var h=this;h.displayName=a.name||'',h.locationObj={formatted_address:'',coords:{}},h.query,h.locationOptions,h.selection,h.showSpinner=!1,h.error,h.searchLocation=function(){h.showSpinner=!0,e.getLocation(h.query).then(function(a){h.showSpinner=!1,a.length?h.locationOptions=a:h.error='no results'}).catch(function(){h.error='Oops! Something went wrong...',errorSvc.logError(profile.controller.searchLocation,'getLocation error')})},h.selectLocation=function(a){h.selection=a,h.locationObj=f.filterGeocodeResult(h.selection),c.$emit('rootScope:changeLocation',h.locationObj),g.cache('location',h.locationObj),h.query='',h.locationOptions=[]},h.clearError=function(){h.error=''},function(){if(h.displayName)g.saveUser(h.displayName,a.token),c.$emit('rootScope:verifyLogin');else{var b=g.getUser();b&&b.displayName&&(h.displayName=b.displayName,c.$emit('rootScope:verifyLogin'))}h.locationObj=g.getFromCache('location')}()}angular.module('app').controller('ProfileController',a),a.$inject=['$routeParams','$location','$rootScope','diaryService','googleApiService','helperService','localStorageService']})();