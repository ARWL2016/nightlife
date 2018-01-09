(function(){
  'use strict';

  const DiaryComponent = {

    templateUrl: 'detail/diary.html', 
    controllerAs: 'vm',
    controller: function() {
      const vm = this;
  
    }
    
  };

angular
  .module('app')
  .component('diary', DiaryComponent);

 
}())