(function(){
  'use strict';

angular
  .module('app')
  .component('diary', {
    templateUrl: 'detail/diary.html', 
    controllerAs: 'vm',
    controller: DiaryController
  });

  DiaryController.$inject = ['datetimeHelperService', '$scope'];

  function DiaryController(datetimeSvc, $scope) {
    const vm = this;

    // model
    vm.datetime = {
      hour: '1.00', 
      amPm: 'PM', 
      date: 'today'
    }

    // populate inputs
    vm.hours = datetimeSvc.getHours;
    vm.dates = datetimeSvc.getNextWeek;

    // UI props
    vm.added = false;
    // vm.diaryBtnLabel = 'Add to Diary';
    vm.diaryBtnLabel = () => vm.added ? 'Added' : 'Add to Diary';
    
    vm.diarySpinner = false;
    vm.error = '';

    vm.emitDatetime = () => {
      console.log('emit dt');
      vm.error = '';
      const dt = datetimeSvc.injectCurrentDate(vm.datetime);
      vm.diarySpinner = true;
      $scope.$emit('addToDiary', dt);
    }

    $scope.$on('eventAdded', () => {
      console.log('added');
      vm.added = true;
      vm.diarySpinner = false;
    }); 

    $scope.$on('eventNotAdded', () => {
      vm.error = 'Sorry. Event could not be added';
    })

  }

 
}())