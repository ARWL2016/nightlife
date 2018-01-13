(function(){

 'use strict';

angular
  .module('app')
  .controller('MainController', MainController);

MainController.$inject = ['localStorageService', 'errorService', '$rootScope'];

function MainController(localStorageSvc, errorSvc, $rootScope) {
  const vm = this;

  // model
  vm.location;
  vm.loggedIn = false;
  vm.user;

  // public methods
  vm.logout = logout;
  
  (function init() {
    errorSvc.logError('main.controller', 'test');
    vm.location = localStorageSvc.getFromCache('location');
    vm.user = localStorageSvc.getUser(); 
    if (vm.user && vm.user.displayName) {
      vm.loggedIn = true;
    } 
  })();
  
  $rootScope.$on('rootScope:changeLocation', function (event, data) {
    vm.location = data;
    localStorageSvc.clearCachedResults();
  });

  $rootScope.$on('rootScope:verifyLogin', function (event, data) {
    vm.loggedIn = true;
  });

  function logout() {
    localStorageSvc.clearCache('user');
    vm.loggedIn = false;
  }
};

}());