/**
 * This service sets and gets data to local storage in the browser
 * @function saveLocation - save the user's selected location 
 */

'use strict';

pathFinderApp.factory('localStorageService', function() {

  function saveLocation(location) {
    localStorage.setItem('location', JSON.stringify(location));
    console.log('saved to local storage');
  }

  return { saveLocation };

});