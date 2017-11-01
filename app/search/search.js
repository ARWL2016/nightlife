'use strict';

angular.module('app.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', function($scope) {
  $scope.title = "Search Places"; 
  $scope.search = {
    query: ''
  }
}]);