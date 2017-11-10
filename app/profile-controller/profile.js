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
  googleApiService, 
  helperService, 
  localStorageService, 
  authService
  ) {
  var vm = this;
  
  vm.displayName = $routeParams.name || '';
  vm.token = $routeParams.token || '';
  vm.error;
  vm.location;
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
    } else {
      // get user 
      // get location
      vm.location = localStorageService.getLocation();
    }
    
    // $location.path('/profile/')
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
    console.log(vm.result);
    console.log(vm.location);
    localStorageService.saveLocation(vm.location);
  }

  init();


}

pathFinderApp.controller('profileCtrl', [
  '$routeParams',
  '$location',
  'googleApiService',
  'helperService',
  'localStorageService',
  'authService',
  ProfileCtrl
]);