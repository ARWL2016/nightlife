/**
 * This is the controller for the main search page, which 
 * displays two search inputs and the results of the user query.
 * There are functions for autocompleting the type input, submitting 
 * the query, and sorting the results by rating and A-Z.
 * 20 results are displayed - this is the max no. returned by the API.
 * 
 * @property search.type refers to a type of establishment (restaurant, station etc)
 * @property search.query - a location query such as a city or street
 * @property limit - can filter the search results (useful on mobile?)
 */

(function(){
'use strict';

angular.module('app').controller('SearchController', [
  '$location', 
  'googleApiService', 
  'helperService', 
  'localStorageService',
  'typeService',
  SearchController
]);

function SearchController($location, googleApiSvc, helperSvc, localStorageSvc, typeSvc) {

  var vm = this;

  vm.limit = 20; 
  vm.location = {formatted_address: '', coords: {}};
  vm.result;
  vm.results;
  vm.search = {type: '', query: '', location: ''};
  vm.showSpinner = false;
  vm.showTypeComplete = false; 
  vm.typeMatches = [];
  vm.validEstablishmentType = true;

  vm.autocompleteType = autocompleteType;
  // vm.closeAutocomplete = closeAutocomplete;
  vm.openDetailPage = openDetailPage;
  vm.selectAutocomplete = selectAutocomplete;
  vm.sortAZ = sortAZ;
  vm.sortByRating = sortByRating;
  vm.submitQuery = submitQuery; 

  function init() {
    console.log('init...');
    vm.location = localStorageSvc.getLocation() || null;
    // console.log(vm.location);
    if (vm.location) {
      vm.search.location = `${vm.location.coords.lat},${vm.location.coords.lng}`;
      // console.log(vm.search);
    }
    
  }

  function sortByRating()  {
    vm.results = vm.results.sort((a, b) => {
      return b.rating - a.rating;
    })
  };

  function sortAZ() {
    vm.results = helperSvc.sortAZ(vm.results);
  }

  function autocompleteType() {
    vm.validEstablishmentType = true;
    
    if (vm.search.type && vm.search.type.length > 0) {
      vm.showTypeComplete = true;
      vm.typeMatches = typeSvc.matchTypes(vm.search.type);
      // console.log(vm.typeMatches);
    }
  }

  function selectAutocomplete(e) {
    vm.search.type = e.target.innerText;
    vm.typeMatches = [];
    console.log(vm.search);
  }

  // function closeAutocomplete(){
  //   vm.showTypeComplete = false;
  // }

  function submitQuery() {
    console.log(vm.search);
    if (!typeSvc.matchOneType(vm.search.type)) {
      vm.validEstablishmentType = false;
      return;
    }
    vm.showSpinner = true;
    googleApiSvc
      .textSearch(vm.search)
      .then(results => {
        console.log({results});

        vm.results = helperSvc.formatTags(results);
        vm.showSpinner = false;
      })
      .catch(err => {
        vm.error = 'No results'; 
        vm.showSpinner = false;
      });
  };

  function openDetailPage(placeid, photoref) {
    console.log({ placeid, photoref });
    $location.path(`/detail/${placeid}/${photoref}`); 
  }

  init();

}



}());