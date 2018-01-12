/**
 *  PURPOSE: this service sets, gets and clears data in browser local storage
 *  TODO: replace custom methods with generic methods
 */

(function(){
  'use strict';

angular
  .module('app')
  .factory('localStorageService', localStorageService);
  
function localStorageService() {

  // generic methods
  function cache(identifier, data) {
    console.log(`Saving to cache with id ${identifier}`);
    localStorage.setItem(identifier, JSON.stringify(data));
  }

  function getFromCache(identifier) {
    console.log(`Retrieving from cache with id ${identifier}`);
    const cache = localStorage.getItem(identifier);
    return JSON.parse(cache);
  } 

  function clearCache(identifier) {
    console.log(`Clearing cache with id ${identifier}`);
    localStorage.setItem(identifier, null);
  }

  // custom methods
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
    saveUser, 
    getUser, 
    saveResults,
    getCachedResults,
    clearCachedResults,
    cache, 
    getFromCache, 
    clearCache
   };

};

}());