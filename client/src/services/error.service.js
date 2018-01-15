/**
 *  PURPOSE: Provide methods for error logging and environment config. 
 *  @function getEnv - request process.env.NODE_ENV from server and sets clientEnv
 *  @function logError - logs error to console in development; post to server in production.
 */

(function(){
  'use strict';

angular
  .module('app')
  .factory('errorService', errorService);

errorService.$inject = ['$http'];

function errorService($http) {

    let clientEnv = 'development';

    function getEnv() {
      return $http.get('/api/config/env')
        .then(resp => {
          clientEnv = resp.data;
          return clientEnv;
        })
        .catch(err => {
          logError(`could not get application mode - defaulted to ${clientEnv}`, 'error.service');
        })
    }

    function logError(origin, error) {
      if (clientEnv === 'development') {
        return console.log({origin, error});
      } 

      if (clientEnv === 'production') {
        const timestamp = (new Date()).toUTCString();
        const errorData = {error, origin, timestamp};

        // if logError returns an error, what do we do with that? Hmmm... 
        $http.post(`/api/error/log`, errorData);
      }
    }

    return { logError, clientEnv, getEnv };
}

}());