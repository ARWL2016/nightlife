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

    function getDetails(placeid) {
      return $http.get(`/api/data/details?placeid=${placeid}`)
        .then(res => {
          if (res.status === 200) {
            return res.data.results;
          } else {
            return Promise.reject();
          }
        });
    }

    return { getInfo, getDetails };

  });