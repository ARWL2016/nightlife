/**
 * This service sets and gets data to local storage in the browser
 * @function saveLocation - save the user's selected location 
 */

'use strict';

pathFinderApp.factory('localStorageService', function() {

  function saveLocation(location) {
    console.log({location});
    localStorage.setItem('location', JSON.stringify('location'));
    console.log('saved to local storage');
  }

  function getLocation() {
    const location = localStorage.getItem('location') || null;
    console.log({location});
    if (location) {
      console.log(JSON.parse(location));
      return location;
    } else {
      return null;
    }
    
  }

  function saveUser(displayName, token) {
    const packet = {displayName, token}; 
    localStorage.setItem('user', JSON.stringify(packet));
    console.log(`saved ${displayName} to LS`);
  }

  return { saveLocation, getLocation, saveUser };

});