'use strict';

/**
 *  PURPOSE: Provide methods for error logging and environment config. 
 *  @function getEnv - request process.env.NODE_ENV from server and sets clientEnv
 *  @function logError - logs error to console in development; post to server in production.
 */

(function () {
  'use strict';

  angular.module('app').factory('errorService', errorService);

  errorService.$inject = ['$http'];

  function errorService($http) {

    var clientEnv = 'development';

    function getEnv() {
      return $http.get('/api/config/env').then(function (resp) {
        clientEnv = resp.data;
        return clientEnv;
      }).catch(function (err) {
        logError('could not get application mode - defaulted to ' + clientEnv, 'error.service');
      });
    }

    function logError(origin, error) {
      if (clientEnv === 'development') {
        return console.log({ origin: origin, error: error });
      }

      if (clientEnv === 'production') {
        var timestamp = new Date().toUTCString();
        var errorData = { error: error, origin: origin, timestamp: timestamp };

        // if logError returns an error, what do we do with that? Hmmm... 
        $http.post('/api/error/log', errorData);
      }
    }

    return { logError: logError, clientEnv: clientEnv, getEnv: getEnv };
  }
})();