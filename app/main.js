'use strict';

// angular.module('app')

const MainCtrl = function(localStorageService, $rootScope) {
  const vm = this;
 
  vm.location;
  vm.loggedIn = false;
  vm.user;
  vm.logout = logout;
  
  (function init() {
    vm.location = localStorageService.getLocation();
    vm.user = localStorageService.getUser(); 

    if (vm.user && vm.user.displayName) {
      vm.loggedIn = true;
    } 

  })();
  

  $rootScope.$on('rootScope:changeLocation', function (event, data) {
    console.log(data); // 'Emit!'
    vm.location = data;
  });

  $rootScope.$on('rootScope:verifyLogin', function (event, data) {
    vm.loggedIn = true;
  });

  function logout() {
    console.log('logout');
    localStorageService.saveUser(undefined, undefined);
    vm.loggedIn = false;
    console.log(vm.loggedIn);
  }


};

pathFinderApp.controller('mainCtrl', [
  'localStorageService', 
  '$rootScope',
  MainCtrl
]);