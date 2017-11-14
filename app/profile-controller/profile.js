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
  vm.result;
  vm.results; 
  vm.showSpinner = false;
  
  vm.searchLocation = searchLocation;
  vm.selectLocation = selectLocation;

  function init() {

    // logging in will set display name and token - IF
    if (vm.displayName && vm.token) {
      localStorageService.saveUser(vm.displayName, vm.token);
      $rootScope.$emit('rootScope:verifyLogin');
    } else {
      // get user if user exists on LS
      const user = localStorageService.getUser();
      if (user && user.displayName) {
        vm.displayName = user.displayName; 
        vm.token = user.token;
        $rootScope.$emit('rootScope:verifyLogin');
      }
    }
    vm.location = localStorageService.getLocation();
  }

  function searchLocation() {
    vm.showSpinner = true;
    googleApiService.getLocation(vm.query)
      .then(results => {
        vm.showSpinner = false;
        if (!results.length) {
          vm.error = 'no results';
        } else {
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