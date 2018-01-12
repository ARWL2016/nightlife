(function(){
  'use strict';

angular
  .module('app')
  .component('events', {
    templateUrl: 'profile/events.html',
    controllerAs: 'vm', 
    controller: EventsController, 
  }); 

EventsController.$inject = ['diaryService', 'errorService', 'localStorageService'];

function EventsController(diarySvc, errorService, localStorageSvc) {
  const vm = this;

  vm.events;
  vm.displayName;

  vm.deleteEvent = deleteEvent;

  function initialize() {
    const user = localStorageSvc.getUser();
    if (user && user.displayName) {
      vm.displayName = user.displayName; 
    }
    getEvents();
  }

  function getEvents() {
    diarySvc.getEvents()
      .then(data => {
        vm.events = data;
        console.log(vm.events);
      })
      .catch(e => console.log(e));
  }

  function deleteEvent(eventToDelete) {
    console.log({event});
    vm.events = vm.events.filter(event => {
      // return ev.place_id !== event.place_id;
      return !angular.equals(eventToDelete, event);
    });
    diarySvc.deleteEvent(eventToDelete)
      .then(() => {
        // TODO - add ui feedback
      })
      .catch(err => {
        errorService.logError('events.component.deleteEvent', err);
      });
  }

  initialize();

}
}());