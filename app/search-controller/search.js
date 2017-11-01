'use strict';

// angular.module('app')

pathFinderApp.controller('searchCtrl', ['$scope', 'googleApiService', function($scope, googleApiService) {
  $scope.title = "Search Places"; 
  $scope.search = {
    query: ''
  };
  $scope.error;
  $scope.results;
  $scope.limit = 10;
  $scope.previousPage = () => {
    $scope.limit = 10;
  }
  $scope.nextPage = () => {
    $scope.limit = -10;
  }
  $scope.sortByRating = () => {
    $scope.limit = 10;
    console.log('sort');
    $scope.results = $scope.results.sort((a, b) => {
      return b.rating - a.rating;
    })
  };

  $scope.submitQuery = () => {
    googleApiService
      .getInfo()
      .then(results => {
        console.log({results});
        $scope.results = results;
      })
      .catch(err => $scope.error = 'No results');

  };
}]);