/**
 * This is the controller for the main search page, which 
 * displays two search inputs and the results of the user query.
 * There are functions for autocompleting the category input, submitting 
 * the query, and sorting the results by rating and A-Z.
 * 20 results are displayed - this is the max no. returned by the API.
 * 
 * @property search.category refers to a category of establishment (restaurant, station etc)
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
  'categoryService',
  SearchController
]);

function SearchController($location, googleApiSvc, helperSvc, localStorageSvc, categorySvc) {

  var vm = this;

  // data props
  vm.location = localStorageSvc.getLocation();
  vm.search = {
    category: '', 
    query: '', 
    coords: ''
  };
  vm.results;

  // UI props
  vm.showSpinner = false;
  vm.showCategoryDropdown = false; 
  vm.categoryMatches = [];

  // custom validator - category must match one from list
  vm.validEstablishmentCategory = true;

  // public methods
  vm.autocompleteCategory = autocompleteCategory;
  vm.selectAutocomplete = selectAutocomplete;
  vm.submitQuery = submitQuery; 

  function init() {
    // get any cached results
    const cache = localStorageSvc.getCachedResults();
    console.log(cache);
    if (cache) {
      vm.results = cache.results;
      vm.search.category = cache.searchParams.category; 
      vm.search.query = cache.searchParams.query; 
    }
    
    // add location to search query
    if (vm.location) {
      vm.search.coords = `${vm.location.coords.lat},${vm.location.coords.lng}`;
    }

  }

  function autocompleteCategory() {
    vm.validEstablishmentCategory = true;
    
    if (vm.search.category && vm.search.category.length > 0) {
      vm.showCategoryDropdown = true;
      vm.categoryMatches = categorySvc.matchCategories(vm.search.category);
    }
  }

  // when the user selects a category from the dropdown - delete the list
  function selectAutocomplete(e) {
    vm.search.category = e.target.innerText;
    vm.categoryMatches = [];
  }

  function submitQuery() {
    if (!categorySvc.matchOneCategory(vm.search.category)) {
      vm.validEstablishmentCategory = false;
      return;
    }
    console.log(vm.search);
    vm.showSpinner = true;
    googleApiSvc
      .textSearch(vm.search)
      .then(results => {
        vm.results = helperSvc.formatTags(results);
        vm.showSpinner = false;
      })
      .catch(err => {
        vm.error = 'No results'; 
        vm.showSpinner = false;
      });
  };

  init();

}



}());

// vm.categoryMatches.length > 0 && 