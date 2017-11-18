'use strict;'

pathFinderApp.factory('diaryService', function($http) {

  function addToDiary(user, location, datetime) {
    const data = JSON.stringify({user, location, datetime});

    const url = '/api/diary/add';
    const config = { headers : {'Content-Type': 'application/json'}};

    console.log({url, data});
    return $http.post(url, data, config)
      .then(resp => {
        console.log(resp);
      })
      .catch(e => console.log(e));
  }

  function getEvents(displayName, token) {
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
  

  
  return { addToDiary, getEvents, deleteEvent };
});