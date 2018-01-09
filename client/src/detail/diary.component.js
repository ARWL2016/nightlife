(function(){
  'use strict';

  const DiaryComponent = {

    templateUrl: 'detail/diary.html', 
    controllerAs: 'vm',
    controller: function() {
      const vm = this;
      vm.hour = '6.00';

      vm.$onInit = function() {
        this.hour = '10.00';
      }
    }
    
  };

  angular.module('app').component('diary', DiaryComponent);

 
}())