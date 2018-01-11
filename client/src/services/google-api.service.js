/**
 * This service returns a set of methods which query the restful API
 * on the back end (located at server/api). 
 * Currently the getDetails method will call both the getDetails 
 * AND the getPhoto method on the back end in parallel.
 * Therefore the getPhoto method here is not used.
 * 
 * @function textSearch 
 * @params query (required) - an address or location 
 * @params type (optional) - type of place, eg restaurant, hospital, bank
 */

(function(){
'use strict';

angular
  .module('app')
  .factory('googleApiService', googleApiService);

googleApiService.$inject = ['$http', 'localStorageService'];
  
function googleApiService($http, localStorageSvc) {

  function textSearch({category, query, coords}) {

    return $http.get(`/api/data/info?q=${query}&type=${category}&location=${coords}`)
      .then(res => {
        if (res.status === 200) {
          const {results} = res.data;
          localStorageSvc.saveResults(results, {category, query});
          return results;
        } else {
          return Promise.reject();
        }
      });
  }

  function getDetails(placeid, photoref) {
    return $http.get(`/api/data/details?placeid=${placeid}&photoref=${photoref}`)
      .then(resp => {
        if (resp.status === 200) {
          console.log({resp});
          return resp.data.result;
        } else {
          return Promise.reject('no data');
        }
      });
  }

  function getLocation(location) {
    const url = `/api/data/location?address=${location}`
    return $http.get(url)
      .then(resp => {
        // console.log({resp});
        return resp.data.results;
      })
      .catch(e => console.log(e));
  }

  // not currently in use
  function getPhoto(photoref) {
    return $http.get(`/api/data/photo?photoref=${photoref}`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp);
          return Promise.resolve(resp.data.result);
        } else {
          return Promise.reject();
        }
      }).catch(err => console.log({ err }));
  }

  return { textSearch, getDetails, getPhoto, getLocation };

};

}());