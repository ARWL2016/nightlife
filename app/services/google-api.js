/**
 * This service returns a set of methods which query the restful API
 * on the back end (located at server/api). 
 * Currently the getDetails method will call both the getDetails 
 * AND the getPhoto method on the back end in parallel.
 * Therefore the getPhoto method here is not used.
 */

'use strict';

pathFinderApp
  .factory('googleApiService', function ($http) {

    function getInfo(query) {
      return $http.get(`/api/data/info?q=${query}`)
        .then(res => {
          if (res.status === 200) {
            return res.data.results;
          } else {
            return Promise.reject();
          }
        });
    }

    function getDetails(placeid, photoref) {
      return $http.get(`/api/data/details?placeid=${placeid}&photoref=${photoref}`)
        .then(resp => {
          if (resp.status === 200) {
            return resp.data.result;
          } else {
            return Promise.reject('no data');
          }
        });
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

    return { getInfo, getDetails, getPhoto };

  });