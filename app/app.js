/**
 * when a controller is declared in the template with the ng-controller directive,
 * it DOES NOT need to be declared on the route too. This will run the digest cycle twice.
 */

'use strict';

// Declare app level module which depends on views, and components
var pathFinderApp = angular.module('pathFinderApp', ['ngRoute']);
  pathFinderApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/login', {
        templateUrl: 'login-controller/login.html'
        // controller: 'loginCtrl'

      })
      .when('/search', {
        templateUrl: 'search-controller/search.html'   
        // controller: 'searchCtrl', 
        
      })
      .when('/profile', {
        templateUrl: 'profile-controller/profile.html'   
        // controller: 'profileCtrl', 
        
      })
      // dev only
      .when('/detail', {
        templateUrl: 'detail-controller/detail.html'  
      })
      .when('/detail/:placeid/:photoref', {
        templateUrl: 'detail-controller/detail.html'  
        // controller: 'detailCtrl',  
      })
      .otherwise({redirectTo: '/search'});
  }]);
