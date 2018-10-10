'use strict';

/**
 *  PURPOSE: fetches events saved by authenticated users. Outputs events to a table.
 *  COMPONENT: <events>
 *  PARENT: profile.controller
 */

(function () {
  'use strict';

  angular.module('app').component('events', {
    templateUrl: 'profile/events.html',
    controllerAs: 'vm',
    controller: EventsController
  });

  EventsController.$inject = ['diaryService', 'errorService', 'localStorageService'];

  function EventsController(diarySvc, errorSvc, localStorageSvc) {
    var vm = this;

    // data model
    vm.events;
    vm.displayName;

    // public method
    vm.deleteEvent = deleteEvent;

    function initialize() {
      var user = localStorageSvc.getUser();
      if (user && user.displayName) {
        vm.displayName = user.displayName;
        getEvents();
      }
    }

    function getEvents() {
      diarySvc.getEvents().then(function (data) {
        vm.events = data;
      }).catch(function (e) {
        errorSvc.logError('events.component.getEvents', 'events were not fetched');
      });
    }

    function deleteEvent(eventToDelete) {
      vm.events = vm.events.filter(function (event) {
        // remove deleted event locally 
        return !angular.equals(eventToDelete, event);
      });
      diarySvc.deleteEvent(eventToDelete).then(function () {
        // TODO - add ui feedback
      }).catch(function (err) {
        errorSvc.logError('events.component.deleteEvent', err);
      });
    }

    initialize();
  }
})();