'use strict';

/**
 *  PURPOSE: this service sets, gets and clears data in browser local storage
 *  TODO: replace custom methods with generic methods
 */

(function () {
  'use strict';

  angular.module('app').factory('localStorageService', localStorageService);

  function localStorageService() {

    // generic methods
    function cache(identifier, data) {
      localStorage.setItem(identifier, JSON.stringify(data));
    }

    function getFromCache(identifier) {
      var cache = localStorage.getItem(identifier);
      return JSON.parse(cache);
    }

    function clearCache(identifier) {
      localStorage.setItem(identifier, null);
    }

    // custom methods
    function saveUser(displayName, token) {
      var packet = { displayName: displayName, token: token };
      localStorage.setItem('user', JSON.stringify(packet));
    }

    function getUser() {
      var user = localStorage.getItem('user');
      return JSON.parse(user);
    }

    function saveResults(results, searchParams) {
      var packet = { results: results, searchParams: searchParams };
      localStorage.setItem('results', JSON.stringify(packet));
    }

    function getCachedResults() {
      var cachedResults = localStorage.getItem('results');
      return JSON.parse(cachedResults);
    }

    function clearCachedResults() {
      localStorage.setItem('results', null);
    }

    return {
      saveUser: saveUser,
      getUser: getUser,
      saveResults: saveResults,
      getCachedResults: getCachedResults,
      clearCachedResults: clearCachedResults,
      cache: cache,
      getFromCache: getFromCache,
      clearCache: clearCache
    };
  };
})();