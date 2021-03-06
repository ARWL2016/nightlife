'use strict';

/**
 *  PURPOSE: declare routes and do app config
 *  Nb: app.config bootstraps the app. Services are not available until app.run. 
 */

(function () {
  'use strict';

  var app = angular.module('app', ['ngRoute']);

  app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    }).when('/search', {
      templateUrl: 'search/search.html',
      controller: 'SearchController',
      controllerAs: 'vm'
    }).when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm'
    }).when('/detail/:placeid/:photoref?', {
      templateUrl: 'detail/detail.html',
      controller: 'DetailController',
      controllerAs: 'vm'
    }).otherwise({ redirectTo: '/search' });
  }]);

  app.run(['localStorageService', 'errorService', function (localStorageSvc, errorSvc) {
    // fetch environment from server
    errorSvc.getEnv().then(function (env) {
      console.log('Pathfinder app running in ' + env + ' mode');
    });

    // clear cache
    localStorageSvc.clearCachedResults();
    localStorageSvc.clearCache('result');
  }]);
})();