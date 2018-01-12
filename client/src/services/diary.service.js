(function(){
  'use strict';

angular
  .module('app')
  .factory('diaryService', diaryService);

diaryService.$inject = ['$http', 'helperService', 'localStorageService'];

function diaryService($http, helperSvc, localStorageSvc) {

  return { addToDiary, getEvents, deleteEvent };

  function addToDiary(user, location, datetime) {

    if (helperSvc.objectIsEmpty([user, location, datetime])) {
      return Promise.reject('Could not add to diary. Data incomplete.');
    }

    const data = JSON.stringify({user, location, datetime});
    const url = '/api/diary/add';
    const config = { headers : {'Content-Type': 'application/json'}};

    console.log({url, data});
    return $http.post(url, data, config);
      
  }

  function getEvents() {
    const user = localStorageSvc.getUser();
    const { displayName, token } = user;
    const url = `api/diary/events/user?name=${displayName}&token=${token}`;
    return $http.get(url)
      .then(resp => {
        console.log(resp);
        return resp.data; 
      });
  }

  function deleteEvent(event) {
    const data = JSON.stringify(event); 

    const url = '/api/diary/delete';
    const config = { headers : {'Content-Type': 'application/json'}};

    console.log({url, data});
    return $http.post(url, data, config)
      .then(resp => {
        console.log(resp);
      })
      .catch(e => console.log(e));
  }
  

}

}());