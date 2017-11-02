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