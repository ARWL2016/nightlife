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
            console.log(resp);
            return resp;
          } else {
            return Promise.reject();
          }
        });
    }

    function getPhoto(photoref) {
      return $http.get(`/api/data/photo?photoref=${photoref}`)
        .then(resp => {
          if (resp.status === 200) {
            console.log(resp);
            return resp;
          } else {
            return Promise.reject();
          }
        });
    }

    return { getInfo, getDetails, getPhoto };

  });