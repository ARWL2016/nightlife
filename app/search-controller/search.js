'use strict';

// angular.module('app')

pathFinderApp.controller('searchCtrl', ['$scope', function($scope) {
  $scope.title = "Search Places"; 
  $scope.search = {
    query: ''
  }
}]);