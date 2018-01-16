/**
 * PURPOSE: This controller displays information about a single search result.
 * ORIGIN: This page is routed from the search page and make API calls to getDetails on init.
 * CACHE: The result is cached. This cache will load unless the page is routed to from the search page (where the cache is cleared)
 * CHILD: This page renders a child component - <diary> - for adding events if the user is logged in.
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

  // data model
  vm.result;
  vm.photoUrl;
  vm.user = localStorageSvc.getUser();

  // computed values
  vm.starRating = { integer: [], decimal: [] };
  vm.parsedWebsiteUrl = () => {
    if (vm.result && vm.result.website) {
      return helperSvc.getDomainFromUrl(vm.result.website);
    }
  }

  // UI properties
  vm.message = '';
  vm.showSpinner = false;

  function initialize() {
    const placeid = $routeParams.placeid;
    const photoref = $routeParams.photoref;

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
    if (placeid) {
      getDetails(placeid);

      // make API call for photo only if ref is available
      if (photoref) {
        getPhoto(photoref);
      }
    } else {
      vm.message = 'Sorry, details not available';
    }
  }

  $scope.$on('addToDiary', (event, datetime) => {
    addLocationToDiary(datetime);
  });

  function getDetails(placeid) {
    googleApiSvc
      .getDetails(placeid)
      .then(result => {
        vm.result = helperSvc.formatHours(helperSvc.formatTags(result)[0]);
        if (vm.result.rating) {
          vm.starRating = helperSvc.createStarRating(vm.result.rating);
        }
        // cache result 
        localStorageSvc.cache('result', vm.result);
      })
      .catch(() => {
        // vm.message = 'information not found';
        errorSvc.logError('detail.controller.getDetails', 'api call error');
      })
      .finally(() => vm.showSpinner = false);
  }

  function getPhoto(photoref) {
    googleApiSvc
      .getPhoto(photoref)
      .then(photoUrl => {
        if (photoUrl) {
          vm.photoUrl = photoUrl;
          localStorageSvc.cache('photoUrl', photoUrl);
        }   
      })
      .catch(err => {
        errorSvc.logError('detail.controller.getPhoto', err);
      });
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