'use strict';

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

(function () {
  'use strict';

  angular.module('app').factory('googleApiService', googleApiService);

  googleApiService.$inject = ['$http', 'localStorageService', 'errorService'];

  function googleApiService($http, localStorageSvc, errorSvc) {

    function getLocation(location) {
      var url = '/api/data/location?address=' + location;
      return $http.get(url).then(function (resp) {
        return resp.data.results;
      }).catch(function (err) {
        errorSvc.logError('google-api-service.getLocation', 'location search error');
        return err;
      });
    }

    function textSearch(_ref) {
      var category = _ref.category,
          query = _ref.query,
          coords = _ref.coords;

      return $http.get('/api/data/info?q=' + query + '&type=' + category + '&location=' + coords).then(function (res) {
        if (res.status === 200) {
          var results = res.data.results;

          if (results.length > 0) {
            localStorageSvc.saveResults(results, { category: category, query: query });
          }
          return results;
        } else {
          return Promise.reject();
        }
      });
    }

    function getDetails(placeid) {
      return $http.get('/api/data/details?placeid=' + placeid).then(function (resp) {
        return resp.data.result;
      }).catch(function (err) {
        errorSvc.logError('google-api.service.getDetails', err);
      });
    }

    function getPhoto(photoref) {
      return $http.get('/api/data/photo?photoref=' + photoref).then(function (resp) {
        return resp.data;
      }).catch(function (err) {
        errorSvc.logError('google-api.service.getPhoto', err);
      });
    }

    return { textSearch: textSearch, getDetails: getDetails, getPhoto: getPhoto, getLocation: getLocation };
  };
})();