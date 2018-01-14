'use strict';

/**
 *  PURPOSE: manages the diary widget which returns a date and time.
 *  PARENT: detail.controller
 *  COMPONENT: Manages custom component <diary>
 */

(function () {
  'use strict';

  angular.module('app').component('diary', {
    templateUrl: 'detail/diary.html',
    controllerAs: 'vm',
    controller: DiaryController
  });

  DiaryController.$inject = ['datetimeHelperService', '$scope'];

  function DiaryController(datetimeSvc, $scope) {
    var vm = this;

    // model
    vm.datetime = {
      hour: '1.00',
      amPm: 'PM',
      date: 'today'

      // populate inputs
    };vm.hours = datetimeSvc.getHours();
    vm.dates = datetimeSvc.getNextWeek();

    // UI props
    vm.added = false;
    vm.clicked = false;
    vm.diaryBtnLabel = function () {
      return vm.added ? 'Added' : 'Add to Diary';
    };
    vm.diarySpinner = false;
    vm.error = '';

    vm.emitDatetime = function () {
      if (!vm.clicked) {
        // disable multiple clicks
        vm.clicked = true;
        vm.error = '';
        var dt = datetimeSvc.injectCurrentDate(vm.datetime);
        vm.diarySpinner = true;
        $scope.$emit('addToDiary', dt);
      }
    };

    $scope.$on('eventAdded', function () {
      vm.added = true;
      vm.diarySpinner = false;
    });

    $scope.$on('eventNotAdded', function () {
      vm.error = 'Sorry. Event could not be added';
    });
  }
})();