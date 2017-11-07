/**
 * @prop location - search query entered by user
 * @prop results - an array of objects representing locations, returned by the geocode API 
 * @prop result - the location object selected by the user;
 * @function searchLocation - called on form submit, send search query to geocode API call on service
 * @function selectLocation - called when user clicks on search result - will add location to local storage / db (if logged in)
 */

'use strict';

const ProfileCtrl = function (googleApiService) {
  var vm = this;
  
  vm.error;
  vm.location;
  vm.results; 
  vm.result;
  vm.searchLocation = searchLocation;
  vm.selectLocation = selectLocation;

  function searchLocation() {
    console.log(vm.location);
    googleApiService.getLocation(vm.location)
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
    console.log(vm.result);
  }

}

pathFinderApp.controller('profileCtrl', [
  'googleApiService',
  ProfileCtrl
]);