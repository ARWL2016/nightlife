'use strict';

// Declare app level module which depends on views, and components
var pathFinderApp = angular.module('pathFinderApp', ['ngRoute']);
  pathFinderApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/login', {
        templateUrl: 'login-controller/login.html',
        controller: 'loginCtrl'
      })
      .when('/search', {
        templateUrl: 'search-controller/search.html',   
        controller: 'searchCtrl'
      })
      .otherwise({redirectTo: '/search'});
  }]);
