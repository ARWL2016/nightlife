'use strict';

/**
 * @function formatTags
 * @param resultsArray or results object
 * @return object array with types changed
 * This function takes in an array of tags and returns a 
 * string with items divided by commas and the _ removed
 * 
 * @function createStarRating
 * @param number 
 * @return an object with one array for the integer value and one for the decimal
 * This method creates two arrays to be consumed by ng-repeat to generate
 * a star rating icon from a number value. 
 * TODO: Find a better way to do this
 * 
 * @function formatHours
 * @param result object 
 * @param result object 
 * This method changes the data structure of the opening hours array from an array of strings 
 * to an array of objects, with separate properties on the object for days and hours. This allows 
 * for easier formatting in the template.
 * 
 * @function filterGeocodeResult() - we only need the location name (for UI display), and 
 * the lat / lon coordinates (for specifying the location in the text search query)
 * 
 * @function editResult() - this takes the full result returned from a detail search and returns just those properties 
 * needed by the UI. 
 * 
 * @function objectIsEmpty(objArray) - takes in an array of objects and returns true if any object is empty
 */

(function () {
  'use strict';

  angular.module('app').factory('helperService', helperService);

  function helperService() {

    function formatTags(results) {

      // if results is an object, put into an array
      var resultsArray = Array.isArray(results) ? results : [results];

      resultsArray.forEach(function (result) {
        var typesString = '';

        result.types.forEach(function (type, index, array) {
          type = type.replace(/_/g, ' ');
          type = sentenceCase(type);
          if (index < array.length - 1) {
            typesString += type + ', ';
          } else {
            typesString += type;
          }
        });
        result.types = typesString;
      });
      return resultsArray;
    }

    function sentenceCase(str) {
      return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    function formatHours(result) {
      if (result.opening_hours) {
        result.opening_hours.formatted_weekday_text = [];
        result.opening_hours.weekday_text.map(function (text) {
          var colonPos = text.indexOf(':');
          var day = text.substring(0, 3);
          var hours = text.substring(colonPos + 2);
          result.opening_hours.formatted_weekday_text.push({ day: day, hours: hours });
        });
      }
      return result;
    }

    function createStarRating(num) {
      var integer = Math.floor(num);
      var decimal = (num - integer).toFixed(1);
      var result = { integer: [], decimal: [] };

      for (var i = 0; i < integer; i++) {
        result.integer.push(i);
      }
      if (decimal > 0.2) {
        result.decimal.push(1);
      }
      return result;
    }

    function sortAZ(results) {
      return results.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;else if (nameA > nameB) return 1;else return 0;
      });
    }

    function filterGeocodeResult(result) {
      var location = {};
      location.formatted_address = result.formatted_address;
      location.coords = result.geometry.location;

      return location;
    }

    function editResult(result) {
      // lodash is mounted on the window object
      return window._.pick(result, 'formatted_address', 'id', 'name', 'opening_hours', 'photohref', 'place_id', 'rating', 'types', 'url', 'vicinity', 'website');
    }

    function objectIsEmpty(objArray) {
      var empty = false;
      if (!objArray.length) {
        empty = true;
        return empty;
      }
      objArray.forEach(function (obj) {
        if (Object.entries(obj).length === 0) {
          empty = true;
        }
      });
      return empty;
    }

    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    // Thanks to Lewdev: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string 

    function getDomainFromUrl(url) {
      var hostname = void 0;

      if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }

      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];

      return hostname;
    }

    return {
      formatTags: formatTags,
      createStarRating: createStarRating,
      formatHours: formatHours,
      sortAZ: sortAZ,
      filterGeocodeResult: filterGeocodeResult,
      editResult: editResult,
      objectIsEmpty: objectIsEmpty,
      isEmpty: isEmpty,
      getDomainFromUrl: getDomainFromUrl
    };
  };
})();