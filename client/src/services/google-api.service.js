/**
 * This service returns a set of methods which query the restful API
 * on the back end (located at server/api). 
 * 
 * @function textSearch 
 * @param query (required) - an address or location 
 * @param type (optional) - type of place, eg restaurant, hospital, bank
 * 
 * @function getDetails - gets detailed information about single location
 * @param placeid returned from textSearch 
 * 
 * @function getPhoto - gets single photo reference for one location 
 * @param - photoref returned from textSearch
 */

(function(){
  'use strict';

angular
  .module('app')
  .factory('googleApiService', googleApiService);

googleApiService.$inject = ['$http', 'localStorageService', 'errorService'];
  
function googleApiService($http, localStorageSvc, errorSvc) {

  function getLocation(location) {
    const url = `/api/data/location?address=${location}`
    return $http.get(url)
      .then(resp => {
        return resp.data.results;
      })
      .catch(err => {
        errorSvc.logError('google-api-service.getLocation', 'location search error');
        return err;
      });
  }

  function textSearch({category, query, coords}) {
    return $http.get(`/api/data/info?q=${query}&type=${category}&location=${coords}`)
      .then(res => {
        if (res.status === 200) {
          const {results} = res.data;
          if (results.length > 0) {
            localStorageSvc.saveResults(results, {category, query});
          }
          return results;
        } else {
          return Promise.reject();
        }
      });
  }

  function getDetails(placeid) {
    return $http.get(`/api/data/details?placeid=${placeid}`)
      .then(resp => {
          return resp.data.result;
      })
      .catch(err => {
        errorSvc.logError('google-api.service.getDetails', err);
      })
  }

  function getPhoto(photoref) {
    return $http.get(`/api/data/photo?photoref=${photoref}`)
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        errorSvc.logError('google-api.service.getPhoto', err);
      });
  }

  return { textSearch, getDetails, getPhoto, getLocation };
};

}());