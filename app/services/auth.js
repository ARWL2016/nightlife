'use strict';

pathFinderApp.factory('authService', function($http) {

  function googleLogin() {
    return $http.get('/auth/google')
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  return { googleLogin };

});