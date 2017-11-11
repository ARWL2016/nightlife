'use strict';

// angular.module('app')

const MainCtrl = function(localStorageService, $rootScope) {
  const vm = this;

  vm.title = "Pathfinder"; 
  vm.location;
  
  (function init() {
    vm.location = localStorageService.getLocation();
  })();
  

  $rootScope.$on('rootScope:changeLocation', function (event, data) {
    console.log(data); // 'Emit!'
    vm.location = data;
  });


};

pathFinderApp.controller('mainCtrl', [
  'localStorageService', 
  '$rootScope',
  MainCtrl
]);