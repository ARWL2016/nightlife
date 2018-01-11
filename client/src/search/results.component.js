/**
 *  Purpose: Displays the results of a search query. 
 *  Element: <search-results>
 *  Parent: search.controller.js 
 *  Input: results object from parent
 *  Output: route to detail.controller.js
 */

(function(){
  'use strict'; 

angular
  .module('app')
  .component('searchResults', {
    templateUrl: 'search/results.html', 
    controllerAs: 'vm', 
    controller: SearchResultsController, 
    bindings: {
      results: '<', 
      message: '<'
    }
  }); 

  SearchResultsController.$inject = ['helperService', '$location'];

  function SearchResultsController(helperSvc, $location) {
    const vm = this; 

    vm.sortByRating = () => {
      vm.results = vm.results.sort((a, b) => {
        return b.rating - a.rating;
      })
    };

    vm.sortAZ = () => {
      vm.results = helperSvc.sortAZ(vm.results);
    }

    vm.routeToDetailPage = (placeid, photoref) => {
      console.log({ placeid, photoref });
      $location.path(`/detail/${placeid}/${photoref}`); 
    }
  }
}())