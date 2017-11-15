/**
 * The detailCtrl controls the template which displays 
 * information about individual search results.
 * This page is linked to dynamically from the search 
 * results and makes an API call  to getDetails on initialization.
 */

'use strict';

const DetailCtrl = function($routeParams, googleApiService, helperService) {
  var vm = this;

  // vm.datetime = {date: '', time: ''}
  vm.placeid = $routeParams.placeid || null;
  vm.photoref = $routeParams.photoref || null;
  vm.starRating = {int: [], dec: []};
  vm.result;

  vm.addToDiary = addToDiary;
  
  function init() {
    console.log(vm.placeid, vm.photoref);
    // getDetails(vm.placeid, vm.photoref);
  }

  function getDetails(placeid, photoref) {
    googleApiService
      .getDetails(placeid, photoref)
      .then(result => {
        // vm.result = result;
        console.log({result});
        vm.result = helperService.formatHours(helperService.formatTags(result)[0]);
        vm.starRating = helperService.createStarRating(result.rating);
        console.log({result});
      })
      .catch(err => console.log({ err }));  
  }

  function addToDiary() {
    console.log(vm.datetime);
  }


  init();
}

pathFinderApp.controller('detailCtrl', [
  '$routeParams', 
  'googleApiService', 
  'helperService',
  DetailCtrl
]);