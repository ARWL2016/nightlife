(function(){

 'use strict';

angular
  .module('app')
  .controller('MainController', MainController);

MainController.$inject = ['localStorageService', 'errorService', '$rootScope', '$location'];

function MainController(localStorageSvc, errorSvc, $rootScope, $location) {
  const vm = this;

  // model
  vm.location;
  vm.loggedIn = false;
  vm.user;
  console.log($location.path());
  // UI properties 
  vm.isActive = function(tab) {
    return $location.path().indexOf(tab) > -1;
  }

  // public methods
  vm.logout = logout;
  
  (function init() {
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