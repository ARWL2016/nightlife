/**
 * This service sets and gets data to local storage in the browser
 * @function saveLocation - save the user's selected location 
 */

// NEEDS CODE REVIEW

(function(){
  'use strict';

angular
  .module('app')
  .factory('localStorageService', localStorageService);
  
function localStorageService() {

  function saveLocation(location) {
    localStorage.setItem('location', JSON.stringify(location));
  }

  function getLocation() {
    const location = localStorage.getItem('location');
    return JSON.parse(location);
  }

  function saveUser(displayName, token) {
    const packet = {displayName, token}; 
    localStorage.setItem('user', JSON.stringify(packet));
  }

  function getUser() {
    const user = localStorage.getItem('user'); 
    return JSON.parse(user);
  }

  function saveResults(results, searchParams) {
    const packet = {results, searchParams};
    localStorage.setItem('results', JSON.stringify(packet));
  }

  function getCachedResults() {
    const cachedResults = localStorage.getItem('results');
    return JSON.parse(cachedResults);
  }

  function clearCachedResults() {
    localStorage.setItem('results', null);
  }

  return { 
    saveLocation, 
    getLocation, 
    saveUser, 
    getUser, 
    saveResults,
    getCachedResults,
    clearCachedResults
   };

};

}());