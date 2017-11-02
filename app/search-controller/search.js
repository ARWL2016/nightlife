'use strict';

const SearchCtrl = function(googleApiService) {
  var vm = this;

  vm.title = "Search Places";
  vm.search = {query: ''};
  vm.error;
  vm.results;
  vm.result;
  vm.imagedata;
  vm.limit = 10;
  vm.previousPage = previousPage;
  vm.nextPage = nextPage;
  vm.sortByRating = sortByRating;
  vm.submitQuery = submitQuery; 
  vm.getDetails = getDetails;
  // vm.getPhoto = getPhoto;

  function previousPage() {
    vm.limit = 10;
  }
  function nextPage() {
    vm.limit = -10;
  }

  function sortByRating()  {
    vm.limit = 10;
    vm.results = vm.results.sort((a, b) => {
      return b.rating - a.rating;
    })
  };

  function submitQuery() {
    googleApiService
      .getInfo()
      .then(results => {
        console.log({results});
        vm.results = results;
      })
      .catch(err => vm.error = 'No results');
  };

  function getDetails(placeid, photoref) {
    console.log({ placeid, photoref });
    googleApiService
      .getDetails(placeid, photoref)
      .then(result => {
        vm.result = result;
        console.log({result});
      })
      .catch(err => console.log({ err }));
      
  }

  // function getPhoto(photoref) {
  //   console.log({photoref });
  //   googleApiService
  //     .getPhoto(photoref)
  //     .then(result => {
  //       vm.imagedata = result.data;
  //       console.log({ result });
  //     })
  //     .catch(err => console.log({ err }));
  // }
}

pathFinderApp.controller('searchCtrl', [ 'googleApiService', SearchCtrl]);