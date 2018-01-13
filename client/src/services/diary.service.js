/**
 *  PURPOSE: provide CRUD methods for the diary widget
 *  SERVER: see controllers/diary
 */

(function(){
  'use strict';

angular
  .module('app')
  .factory('diaryService', diaryService);

diaryService.$inject = ['$http', 'helperService', 'localStorageService', 'errorService'];

function diaryService($http, helperSvc, localStorageSvc, errorSvc) {

  

  function addToDiary(user, location, datetime) {
    if (helperSvc.objectIsEmpty([user, location, datetime])) {
      return Promise.reject('Could not add to diary. Data incomplete.');
    }

    const data = JSON.stringify({user, location, datetime});
    const url = '/api/diary/add';
    const config = { headers : {'Content-Type': 'application/json'}};

    // TODO: add then / catch
    return $http.post(url, data, config);
  }

  function getEvents() {
    const user = localStorageSvc.getUser();

    if (helperSvc.objectIsEmpty([user])) {
      return Promise.reject('user not logged in');
      
    } else {
      const { displayName, token } = user;
      const url = `api/diary/events/user?name=${displayName}&token=${token}`;
      return $http.get(url)
        .then(resp => {
          return resp.data; 
        })
        .catch(err => {
          errorSvc.logError('diary.service.getEvents', 'events could not be fetched');
          return err;
        })
    }
  }

  function deleteEvent(event) {
    const data = JSON.stringify(event); 

    const url = '/api/diary/delete';
    const config = { headers : {'Content-Type': 'application/json'}, data };

    return $http.delete(url, config)
      .then(() => {})
      .catch(err => {
        errorSvc.logError('diary.service.deleteEvent', err); 
        return err;
      });
  }

  return { addToDiary, getEvents, deleteEvent };
}

}());