(function(){
  'use strict';

  angular.module('app').controller('LoginController', [LoginController]);

  function LoginController() {
    var vm = this;
    
    vm.title = "Login Dynamic";

  }

}());