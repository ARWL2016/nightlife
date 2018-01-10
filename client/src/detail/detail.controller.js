/**
 * This controller displays information about a single search result.
 * This page is routed from the search page and makes an API call to getDetails on init.
 * This page contains a child component - diary - for adding events.
 * 
 * @prop placeid - unique googleapis id associated with a location 
 * @function getDetails - this makes two calls to the googleAPI: see server/api/get-details and server/api/getphoto
 * 
 */

(function(){
  'use strict';

angular
  .module('app')
  .controller('DetailController', DetailController);

DetailController.$inject = 
  ['$routeParams', 'datetimeHelperService','diaryService','googleApiService', 'helperService','localStorageService', '$rootScope'];

function DetailController ($routeParams, datetimeSvc, diarySvc, googleApiSvc, helperSvc, localStorageSvc, $rootScope ) {
  var vm = this;

  // data
  vm.placeid = $routeParams.placeid || null;
  vm.photoref = $routeParams.photoref || null;
  vm.result;
  vm.starRating = {int: [], dec: []};
  vm.user = localStorageSvc.getUser();

  function initialize() {
    if (vm.placeid && vm.photoref) {
      getDetails(vm.placeid, vm.photoref);
    }
  }

  $rootScope.$on('addToDiary', (event, datetime) => {
    addLocationToDiary(datetime);
  });

  function getDetails(placeid, photoref) {
    googleApiSvc
      .getDetails(placeid, photoref)
      .then(result => {
        vm.result = helperSvc.formatHours(helperSvc.formatTags(result)[0]);
        vm.starRating = helperSvc.createStarRating(vm.result.rating);
      })
      .catch(err => console.log({ err }));  
  }

  function addLocationToDiary(datetime) {
    const location = helperSvc.editResult(vm.result);
    
    diarySvc.addToDiary(vm.user, location, datetime)
      .then(() => $rootScope.$broadcast('eventAdded'))
      .catch(() => $rootScope.$broadcast('eventNotAdded'));
  }

  initialize();
}

}());