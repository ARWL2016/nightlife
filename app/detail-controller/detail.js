/**
 * The detailCtrl controls the template which displays 
 * information about individual search results.
 * This page is linked to dynamically from the search 
 * results and makes an API call  to getDetails on initialization.
 */

'use strict';

const DetailCtrl = function($routeParams, googleApiService, helperService) {
  var vm = this;

  vm.placeid = $routeParams.placeid;
  vm.photoref = $routeParams.photoref;
  vm.result;
  vm.starRating = {int: [], dec: []};
  
  function init() {
    console.log(vm.placeid, vm.photoref);
    getDetails(vm.placeid, vm.photoref);
  }

  function getDetails(placeid, photoref) {
    googleApiService
      .getDetails(placeid, photoref)
      .then(result => {
        // vm.result = result;
        vm.result = helperService.formatHours(helperService.formatTags(result)[0]);
        vm.starRating = helperService.createStarRating(result.rating);
        console.log({result});
      })
      .catch(err => console.log({ err }));  
  }


  init();
}

pathFinderApp.controller('detailCtrl', [
  '$routeParams', 
  'googleApiService', 
  'helperService',
  DetailCtrl
]);