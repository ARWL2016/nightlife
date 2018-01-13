/**
 * PURPOSE: show auth status and location if cached; render set location widget (calls the Geocode API); 
 * @prop query - search query entered by user
 * @prop locationOptions - an array of objects representing locations, returned by the geocode API 
 * @prop selection - the location object selected by the user;
 * @function searchLocation() - called on form submit, sends search query to geocode API call on service
 * @function selectLocation() - called when user clicks on search selection - will add location to local storage / db (if logged in)
 */

(function(){
  'use strict';

angular
  .module('app')
  .controller('ProfileController',  ProfileController);

ProfileController.$inject = ['$routeParams','$location','$rootScope','diaryService','googleApiService','helperService','localStorageService'];

function ProfileController( $routeParams, $location, $rootScope, diarySvc, googleApiSvc, helperSvc, localStorageSvc) {
  const vm = this;
  
  // user data
  vm.displayName = $routeParams.name || '';

  // location data
  vm.locationObj = {formatted_address: '', coords: {}};
  vm.query;
  vm.locationOptions; 
  vm.selection;

  // UI properties
  vm.showSpinner = false;
  vm.error;
  
  // public methods
  vm.searchLocation = searchLocation;
  vm.selectLocation = selectLocation;
  vm.clearError = clearError;

  function initialize() {
    // if routed from login, save the user to local storage and get their events
    if (vm.displayName) {
      localStorageSvc.saveUser(vm.displayName, $routeParams.token);
      $rootScope.$emit('rootScope:verifyLogin');
    } else {
      // check if user is logged in and get their credentials
      const user = localStorageSvc.getUser();
      if (user && user.displayName) {
        vm.displayName = user.displayName; 
        $rootScope.$emit('rootScope:verifyLogin');
      }
    }
    vm.locationObj = localStorageSvc.getFromCache('location');
  }

  function searchLocation() {
    vm.showSpinner = true;
    googleApiSvc.getLocation(vm.query)
      .then(locationOptions => {
        vm.showSpinner = false;
        if (!locationOptions.length) {
          vm.error = 'no results';
        } else {
          vm.locationOptions = locationOptions;
        }
      })
      .catch(() => {
        vm.error = 'Oops! Something went wrong...';
        errorSvc.logError(profile.controller.searchLocation, 'getLocation error');
      });
  }

  function selectLocation(selection) {
    vm.selection = selection;
    vm.locationObj = helperSvc.filterGeocodeResult(vm.selection);

    // emit location change event for main.controller and search.controller
    $rootScope.$emit('rootScope:changeLocation', vm.locationObj);

    // save to cache
    localStorageSvc.cache('location', vm.locationObj);

    // reset location search properties
    vm.query = '';
    vm.locationOptions = [];
  }

  function clearError() {
    vm.error = '';
  }

  initialize();
}

}());