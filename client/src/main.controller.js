(function(){

'use strict';

  angular.module('app').controller('MainController', ['localStorageService', '$rootScope', MainController]);

  function MainController(localStorageSvc, $rootScope) {
    const vm = this;
  
    vm.location;
    vm.loggedIn = false;
    vm.user;
    vm.logout = logout;
    
    (function init() {
      vm.location = localStorageSvc.getLocation();
      vm.user = localStorageSvc.getUser(); 
      console.log(vm.user);
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
      console.log('logout');
      localStorageSvc.saveUser(undefined, undefined);
      vm.loggedIn = false;
      console.log(vm.loggedIn);
    }


  };

}());