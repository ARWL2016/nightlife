'use strict';

const SearchCtrl = function(googleApiService) {
  var vm = this;

  vm.title = "Search Places";
  vm.search = {query: ''};
  vm.error;
  vm.results;
  vm.limit = 10;
  vm.previousPage = previousPage;
  vm.nextPage = nextPage;
  vm.sortByRating = sortByRating;
  vm.submitQuery = submitQuery; 
  vm.getDetails = getDetails;

  function previousPage() {
    vm.limit = 10;
  }
  function nextPage() {
    vm.limit = -10;
  }

  function sortByRating()  {
    vm.limit = 10;
    console.log('sort');
    vm.results = vm.results.sort((a, b) => {
      return b.rating - a.rating;
    })
  };

  function submitQuery() {
    googleApiService
      .getInfo()
      .then(results => {
        vm.results = results;
      })
      .catch(err => vm.error = 'No results');
  };

  function getDetails(id) {
    console.log({ id });
    googleApiService
      .getDetails(id)
      .then(results => {
        console.log(results);
      })
      .catch(err => console.log({ err }));
  }
}

pathFinderApp.controller('searchCtrl', [ 'googleApiService', SearchCtrl]);