(function(){
  'use strict'; 

angular
  .module('app')
  .component('searchResults', {
    templateUrl: 'search/results.html', 
    controllerAs: 'vm', 
    controller: SearchResultsController
  }); 

  SearchResultsController.$inject = [];

  function SearchResultsController() {
    const vm = this; 
  }
}())