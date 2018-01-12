/**
 * @prop query - search query entered by user
 * @prop locationOptions - an array of objects representing locations, returned by the geocode API 
 * @prop selection - the location object selected by the user;
 * @function searchLocation() - called on form submit, sends search query to geocode API call on service
 * @function selectLocation() - called when user clicks on search selection - will add location to local storage / db (if logged in)
 * @function getEvents() - fetch diaried events if user is logged in
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
  // vm.events;

  // location data
  vm.locationObj = {formatted_address: '', coords: {}};
  vm.query;
  vm.locationOptions; 
  vm.selection;

  // UI properties
  vm.showSpinner = false;
  vm.error;
  
  vm.searchLocation = searchLocation;
  vm.selectLocation = selectLocation;
  // vm.deleteEvent = deleteEvent;

  function initialize() {
    // if routed from login, save the user to local storage and get their events
    if (vm.displayName) {
      localStorageSvc.saveUser(vm.displayName, $routeParams.token);
      $rootScope.$emit('rootScope:verifyLogin');
      // getEvents();
    } else {
      // check if user is logged in and get their credentials
      const user = localStorageSvc.getUser();
      if (user && user.displayName) {
        vm.displayName = user.displayName; 
 
        $rootScope.$emit('rootScope:verifyLogin');
        // getEvents();
      }
    }
    vm.locationObj = localStorageSvc.getFromCache('location');
  }

  function searchLocation() {
    vm.showSpinner = true;
    googleApiSvc.getLocation(vm.query)
      .then(locationOptions => {
        console.log(locationOptions);
        vm.showSpinner = false;
        if (!locationOptions.length) {
          vm.error = 'no results';
        } else {
          vm.locationOptions = locationOptions;
        }
      })
  }

  function selectLocation(selection) {
    vm.selection = selection;
    vm.locationObj = helperSvc.filterGeocodeResult(vm.selection);
    $rootScope.$emit('rootScope:changeLocation', vm.locationObj);
    // localStorageSvc.saveLocation(vm.locationObj);
    localStorageSvc.cache('location', vm.locationObj);
    vm.query = undefined;
    vm.locationOptions = undefined;
  }

  // function getEvents() {
  //   diarySvc.getEvents()
  //     .then(data => {
  //       vm.events = data;
  //       console.log(vm.events);
  //     })
  //     .catch(e => console.log(e));
  // }

  // function deleteEvent(event) {
  //   console.log({event});
  //   diarySvc.deleteEvent(event)
  //     .then(() => {
  //       vm.events = vm.events.forEach(ev => {
  //         return ev.place_id !== event.place_id;
  //       });
  //     })
  //     .catch(e => console.log(e));
  // } 

  initialize();
}

}());