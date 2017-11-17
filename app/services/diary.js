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
  

  
  return { addToDiary };
});