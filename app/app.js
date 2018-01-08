/**
 * when a controller is declared in the template with the ng-controller directive,
 * it DOES NOT need to be declared on the route too. This will run the digest cycle twice.
 */

(function(){ 
  'use strict';

  var app = angular.module('app', ['ngRoute']);
  
  app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController', 
        controllerAs: 'vm'

      })
      .when('/search', {
        templateUrl: 'search/search.html',  
        controller: 'SearchController', 
        controllerAs: 'vm'
        
      })
      .when('/profile', {
        templateUrl: 'profile/profile.html', 
        controller: 'ProfileController', 
        controllerAs: 'vm'
        
      })
      // dev only
      .when('/detail', {
        templateUrl: 'detail/detail.html',
        controller: 'DetailController', 
        controllerAs: 'vm'
      })
      .when('/detail/:placeid/:photoref', {
        templateUrl: 'detail/detail.html',  
        controller: 'DetailController', 
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/search'});
  }]);

}());