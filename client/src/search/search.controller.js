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

  vm.location = {formatted_address: '', coords: {}};
  vm.results;
  vm.search = {category: '', query: '', location: ''};
  vm.showSpinner = false;
  vm.showCategoryDropdown = true; 
  vm.categoryMatches = [];

  // custom validator - category must match one from list
  vm.validEstablishmentCategory = true;

  vm.autocompleteCategory = autocompleteCategory;
  vm.selectAutocomplete = selectAutocomplete;
  vm.submitQuery = submitQuery; 

  function init() {
    console.log('init...');
    vm.location = localStorageSvc.getLocation() || null;
    if (vm.location) {
      vm.search.location = `${vm.location.coords.lat},${vm.location.coords.lng}`;
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