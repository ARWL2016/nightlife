/**
 * @prop query - search query entered by user
 * @prop results - an array of objects representing locations, returned by the geocode API 
 * @prop result - the location object selected by the user;
 * @function searchLocation() - called on form submit, sends search query to geocode API call on service
 * @function selectLocation() - called when user clicks on search result - will add location to local storage / db (if logged in)
 * @function getEvents() - fetch diaried events if user is logged in
 */

(function(){
'use strict';

angular.module('app').controller('ProfileController', [
  '$routeParams',
  '$location',
  '$rootScope',
  'diaryService',
  'googleApiService',
  'helperService',
  'localStorageService',
  ProfileController
]);

function ProfileController(
  $routeParams,
  $location,
  $rootScope,
  diarySvc,
  googleApiSvc, 
  helperSvc, 
  localStorageSvc
  ) {
  const vm = this;
  
  vm.displayName = $routeParams.name || '';
  vm.token = $routeParams.token || '';
  vm.error;
  vm.events;
  vm.location = {formatted_address: '', coords: {}};
  vm.loggedIn = false;
  vm.query;
  vm.result;
  vm.results; 
  vm.showSpinner = false;
  
  vm.searchLocation = searchLocation;
  vm.selectLocation = selectLocation;
  vm.deleteEvent = deleteEvent;

  function initialize() {
    if (vm.displayName && vm.token) {
      localStorageSvc.saveUser(vm.displayName, vm.token);
      $rootScope.$emit('rootScope:verifyLogin');
      getEvents();
    } else {
      const user = localStorageSvc.getUser();
      if (user && user.displayName) {
        vm.displayName = user.displayName; 
        vm.token = user.token;
        $rootScope.$emit('rootScope:verifyLogin');
        getEvents();
      }
    }
    vm.location = localStorageSvc.getLocation();
  }

  function searchLocation() {
    vm.showSpinner = true;
    googleApiSvc.getLocation(vm.query)
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
    vm.location = helperSvc.filterGeocodeResult(vm.result);
    $rootScope.$emit('rootScope:changeLocation', vm.location);
    localStorageSvc.saveLocation(vm.location);
    vm.query = undefined;
    vm.results = undefined;
  }

  function getEvents() {
    diarySvc.getEvents(vm.displayName, vm.token)
      .then(data => {
        vm.events = data;
        console.log(vm.events);
      })
      .catch(e => console.log(e));
  }

  function deleteEvent(event) {
    console.log({event});
    diarySvc.deleteEvent(event)
      .then(() => {
        vm.events = vm.events.forEach(ev => {
          return ev.place_id !== event.place_id;
        });
      })
      .catch(e => console.log(e));
  } 

  initialize();
}

}());