/**
 * @prop query - search query entered by user
 * @prop results - an array of objects representing locations, returned by the geocode API 
 * @prop result - the location object selected by the user;
 * @function searchLocation - called on form submit, sends search query to geocode API call on service
 * @function selectLocation - called when user clicks on search result - will add location to local storage / db (if logged in)
 */

'use strict';

const ProfileCtrl = function(
  $routeParams,
  $location,
  $rootScope,
  googleApiService, 
  helperService, 
  localStorageService, 
  authService
  ) {
  const vm = this;
  
  vm.displayName = $routeParams.name || '';
  vm.token = $routeParams.token || '';
  vm.error;
  vm.location = {formatted_address: '', coords: {}};
  vm.loggedIn = false;
  vm.query;
  vm.results; 
  vm.result;
  
  vm.searchLocation = searchLocation;
  vm.selectLocation = selectLocation;

  function init() {
    console.log(vm.displayName, vm.token);
    if (vm.displayName && vm.token) {
      localStorageService.saveUser(vm.displayName, vm.token);
      console.log('if');
    } else {
      console.log('else');
      // get user 
      vm.location = localStorageService.getLocation();
      console.log('vm-loc', vm.location);
      
    
    }
    

  }

  function searchLocation() {
    console.log(vm.query);
    googleApiService.getLocation(vm.query)
      .then(results => {
        if (!results.length) {
          vm.error = 'no results';
        } else {
          console.log({results});
          vm.results = results;
        }
      })
  }

  function selectLocation(result) {
    vm.result = result;
    vm.location = helperService.filterGeocodeResult(vm.result);
    $rootScope.$emit('rootScope:changeLocation', vm.location);
    localStorageService.saveLocation(vm.location);
    vm.query = undefined;
    vm.results = undefined;
  }

  init();


}

pathFinderApp.controller('profileCtrl', [
  '$routeParams',
  '$location',
  '$rootScope',
  'googleApiService',
  'helperService',
  'localStorageService',
  'authService',
  ProfileCtrl
]);