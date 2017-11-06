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

'use strict';

const SearchCtrl = function($location, googleApiService, helperService, typeService) {
  var vm = this;

  vm.error;
  vm.limit = 20; 
  vm.result;
  vm.results;
  vm.search = {type: '', query: ''};
  vm.typeMatches = [];

  vm.autocompleteType = autocompleteType;
  vm.openDetailPage = openDetailPage;
  vm.selectAutocomplete = selectAutocomplete;
  vm.sortAZ = sortAZ;
  vm.sortByRating = sortByRating;
  vm.submitQuery = submitQuery; 

  function sortByRating()  {
    vm.results = vm.results.sort((a, b) => {
      return b.rating - a.rating;
    })
  };

  function sortAZ() {
    vm.results = helperService.sortAZ(vm.results);
  }

  function autocompleteType() {
    console.log(vm.search.type)
    if (vm.search.type.length > 2) {
      vm.typeMatches = typeService.matchTypes(vm.search.type);
      console.log(vm.typeMatches);
    }
  }

  function selectAutocomplete(e) {
    vm.search.type = e.target.innerText;
    vm.typeMatches = [];
  }

  function submitQuery() {
    if (!vm.search.query || !vm.search.type) {
      console.log(vm.search);
      vm.error = 'enter a search query and location';
      return;
    }
    console.log(vm.search);
    googleApiService
      .textSearch(vm.search)
      .then(results => {
        console.log({results});

        vm.results = helperService.formatTags(results);
      })
      .catch(err => vm.error = 'No results');
  };

  function openDetailPage(placeid, photoref) {
    console.log({ placeid, photoref });
    $location.path(`/detail/${placeid}/${photoref}`); 
  }

}

pathFinderApp.controller('searchCtrl', [
  '$location', 
  'googleApiService', 
  'helperService', 
  'typeService',
  SearchCtrl
]);