/**
 * This controller displays information about a single search result.
 * This page is routed from the search page and make API calls to getDetails on init.
 * The result is cached. This cache will load unless the page is routed to from the search page (where the cache is cleared)
 * This page renders a child component - <diary> - for adding events, if the user is logged in.
 */

(function(){
  'use strict';

angular
  .module('app')
  .controller('DetailController', DetailController);

DetailController.$inject = 
  ['$routeParams', 'datetimeHelperService','diaryService','googleApiService', 'helperService','localStorageService', '$scope', '$rootScope', 'errorService'];

function DetailController ($routeParams, datetimeSvc, diarySvc, googleApiSvc, helperSvc, localStorageSvc, $scope, $rootScope, errorSvc ) {
  var vm = this;

  // data
  vm.placeid = $routeParams.placeid || null;
  vm.photoref = $routeParams.photoref || null;
  vm.result;
  vm.photoUrl;
  vm.user = localStorageSvc.getUser();

  // computed values
  vm.starRating = () => {
    if (vm.result) {
      return helperSvc.createStarRating(vm.result.rating);
    }
  }
  vm.parsedWebsiteUrl = () => {
    if (vm.result && vm.result.website) {
      return helperSvc.getDomainFromUrl(vm.result.website);
    }
  }

  // UI properties
  vm.message = '';
  vm.showSpinner = false;

  function initialize() {
    vm.showSpinner = true;
    const cachedResult = localStorageSvc.getFromCache('result');
    const cachedPhotoUrl = localStorageSvc.getFromCache('photoUrl');

    // return cached result if it exists
    if (cachedResult) {
      vm.result = cachedResult;
      vm.photoUrl = cachedPhotoUrl;
      vm.showSpinner = false;
      return;
    } 

    // else make API calls
    if (vm.placeid) {
      getDetails();

      // make API call for photo if only ref is available
      if (vm.photoref) {
        getPhoto();
      }
    } else {
      vm.message = 'Sorry, details not available';
    }
    
  }

  $scope.$on('addToDiary', (event, datetime) => {
    console.log('add to diary event');
    addLocationToDiary(datetime);
  });

  function getDetails() {
    googleApiSvc
      .getDetails(vm.placeid)
      .then(result => {
        vm.result = helperSvc.formatHours(helperSvc.formatTags(result)[0]);
        // vm.starRating = helperSvc.createStarRating(vm.result.rating);
        
        // cache result 
        localStorageSvc.cache('result', vm.result);
      })
      .catch(err => {
        errorSvc.logError('detail.controller.getDetails', err);
      })
      .finally(() => vm.showSpinner = false);
  }

  function getPhoto() {
    googleApiSvc
      .getPhoto(vm.photoref)
      .then(photoUrl => {
        vm.photoUrl = photoUrl;

        // save to cache
        localStorageSvc.cache('photoUrl', photoUrl);

      })
      .catch(err => {
        errorSvc.logError('detail.controller.getPhoto', err);
      })
  }

  function addLocationToDiary(datetime) {
    const location = helperSvc.editResult(vm.result);
    
    diarySvc.addToDiary(vm.user, location, datetime)
      .then(() => $rootScope.$broadcast('eventAdded'))
      .catch((err) => {
        $rootScope.$broadcast('eventNotAdded');
        errorSvc.logError('detail.controller.addLocationToDiary', err);
      });
  }

  initialize();
}

}());