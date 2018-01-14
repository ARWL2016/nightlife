'use strict';

/**
 *  PURPOSE: provide CRUD methods for the diary widget
 *  SERVER: see controllers/diary
 */

(function () {
  'use strict';

  angular.module('app').factory('diaryService', diaryService);

  diaryService.$inject = ['$http', 'helperService', 'localStorageService', 'errorService'];

  function diaryService($http, helperSvc, localStorageSvc, errorSvc) {

    function addToDiary(user, location, datetime) {
      if (helperSvc.objectIsEmpty([user, location, datetime])) {
        return Promise.reject('Could not add to diary. Data incomplete.');
      }

      var data = JSON.stringify({ user: user, location: location, datetime: datetime });
      var url = '/api/diary/add';
      var config = { headers: { 'Content-Type': 'application/json' } };

      // TODO: add then / catch
      return $http.post(url, data, config);
    }

    function getEvents() {
      var user = localStorageSvc.getUser();
      if (helperSvc.isEmpty(user)) {
        return Promise.reject('user not logged in');
      } else {
        var displayName = user.displayName,
            token = user.token;

        var url = 'api/diary/events/user?name=' + displayName + '&token=' + token;
        return $http.get(url).then(function (resp) {
          return resp.data;
        }).catch(function (err) {
          errorSvc.logError('diary.service.getEvents', 'events could not be fetched');
          return err;
        });
      }
    }

    function deleteEvent(event) {
      var data = JSON.stringify(event);

      var url = '/api/diary/delete';
      var config = { headers: { 'Content-Type': 'application/json' }, data: data };

      return $http.delete(url, config).then(function () {}).catch(function (err) {
        errorSvc.logError('diary.service.deleteEvent', err);
        return err;
      });
    }

    return { addToDiary: addToDiary, getEvents: getEvents, deleteEvent: deleteEvent };
  }
})();