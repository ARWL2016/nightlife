/**
 * This function is the controller for the search page, which 
 * renders a search input and the results of the initial query
 */

'use strict';

const SearchCtrl = function($location, googleApiService, helperService) {
  var vm = this;

  vm.title = "Search Places";
  vm.search = {query: '', location: ''};
  vm.error;
  vm.results;
  vm.result;
  vm.limit = 20; // number of result to display (max 20)
  vm.sortByRating = sortByRating;
  vm.sortAZ = sortAZ;
  vm.submitQuery = submitQuery; 
  vm.openDetailPage = openDetailPage;

  function sortByRating()  {
    vm.results = vm.results.sort((a, b) => {
      return b.rating - a.rating;
    })
  };

  function sortAZ() {
    vm.results = helperService.sortAZ(vm.results);
  }

  // TODO: add location and query params
  function submitQuery() {
    googleApiService
      .getInfo()
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

pathFinderApp.controller('searchCtrl', ['$location', 'googleApiService', 'helperService', SearchCtrl]);