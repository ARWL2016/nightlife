'use strict';

/**
 *  PURPOSE: Provide datetime helper methods to the diary widget
 */

(function () {
  'use strict';

  angular.module('app').factory('datetimeHelperService', datetimeHelperService);

  function datetimeHelperService() {

    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // get all the dates for next week
    function getNextWeek() {
      var nextWeek = [];

      for (var i = 1; i < 7; i++) {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);

        var day = week[currentDate.getDay()];
        var date = currentDate.getDate();
        var month = months[currentDate.getMonth()];
        var dateString = day + ', ' + date + ' ' + month;

        nextWeek.push(dateString);
      }
      return nextWeek;
    }

    function getTodaysDate() {
      var currentDate = new Date();
      var day = week[currentDate.getDay()];
      var date = currentDate.getDate();
      var month = months[currentDate.getMonth()];
      return day + ', ' + date + ' ' + month;
    }

    // get list of 1.00 - 12.00 
    function getHours() {
      var hours = [];
      for (var i = 2; i < 13; i++) {
        hours.push(i + ':00');
      }
      return hours;
    }

    function injectCurrentDate(datetime) {
      if (datetime.date = 'today') {
        datetime.date = getTodaysDate();
      }
      return datetime;
    }

    return { getNextWeek: getNextWeek, getHours: getHours, getTodaysDate: getTodaysDate, injectCurrentDate: injectCurrentDate };
  };
})();