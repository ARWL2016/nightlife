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
  vm.showDropdown = false; 
  vm.categoryMatches = [];
  vm.message;

  // public methods
  vm.populateAutocomplete = populateAutocomplete;
  vm.selectFromAutocomplete = selectFromAutocomplete;
  vm.submitQuery = submitQuery; 

  function init() {
    // get any cached results
    const cache = localStorageSvc.getCachedResults();
    if (cache) {
      vm.results = cache.results;
      vm.search.category = cache.searchParams.category; 
      vm.search.query = cache.searchParams.query; 
    }
    
    // add location to search query
    if (vm.location) {
      vm.search.coords = `${vm.location.coords.lat},${vm.location.coords.lng}`;
    }

    // clear result from detail page before user can route there
    localStorageSvc.clearCachedResult();

  }

  function populateAutocomplete() {
    console.log(vm.search.category);
    vm.message = '';
    if (vm.search.category && vm.search.category.length > 0) {
      vm.showDropdown = true;
      vm.categoryMatches = categorySvc.matchCategories(vm.search.category);
    }
  }

  // set category and hide autocomplete
  function selectFromAutocomplete(e) {
    vm.message = '';
    vm.search.category = e.target.innerText;
    vm.categoryMatches = [];
  }

  function submitQuery() {
    if (!categorySvc.isCategoryValid(vm.search.category)) {
      return vm.message = 'Invalid category. Please choose one from the list.'
    }
    console.log(vm.search);
    vm.showSpinner = true;
    googleApiSvc
      .textSearch(vm.search)
      .then(results => {
        if (results.length) {
          vm.results = helperSvc.formatTags(results);
          
        } else {
          vm.message = 'Your search returned no results.'
        }
      })
      .catch(err => {
        vm.message = 'Oops! Something went wrong...'; 
        
      })
      .finally(() => {
        vm.showSpinner = false;
      })
  };

  init();

}



}());

// vm.categoryMatches.length > 0 && 