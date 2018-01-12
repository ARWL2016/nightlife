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

(function(){
  'use strict';

angular
  .module('app')
  .factory('helperService', helperService);

function helperService() {

  function formatTags(results) {
  
    // if results is an object, put into an array
    const resultsArray = Array.isArray(results) ? results : [results];

    resultsArray.forEach(result => {
      let typesString = ''; 

      result.types.forEach((type, index, array) => {
        type = type.replace(/_/g, ' ');
        type = sentenceCase(type);
        if (index < array.length -1) {
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
    return str.substring(0,1).toUpperCase() + str.substring(1);
  }

  function formatHours(result) {
    if (result.opening_hours) {
      result.opening_hours.formatted_weekday_text = []; 
      result.opening_hours.weekday_text.map(text => {
        const colonPos = text.indexOf(':');
        const day = text.substring(0, 3);
        const hours = text.substring(colonPos + 2);
        result.opening_hours.formatted_weekday_text.push({day, hours});
      }); 
    }
    return result;
  }

  function createStarRating(num) {
    const integer = Math.floor(num);
    const decimal = (num - integer).toFixed(1);
    const result = {integer: [], decimal: []};
    
    for (let i = 0; i < integer; i++) {
      result.integer.push(i);
    }
    
    if (decimal > 0.2) {
      result.decimal.push(1);
    }

    return result;
  }

  function sortAZ(results) {
    return results.sort((a, b) => {
      const nameA = a.name.toLowerCase(); 
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1; 
      else if (nameA > nameB) return 1; 
      else return 0;
    }); 
  }

  function filterGeocodeResult(result) {
    const location = {}; 
    location.formatted_address = result.formatted_address;
    location.coords = result.geometry.location;

    return location;
  }

  function editResult(result) {
    // delete result.opening_hours.formatted_weekday_text; 
    // delete result.opening_hours.periods; 
    // delete result.opening_hours.open_now;
    // delete result.id;

    return window._.pick(result, 
      'formatted_address', 'id', 'name', 'opening_hours', 'photohref', 'place_id', 'rating', 'types', 'url', 'vicinity', 'website');
  }

  function objectIsEmpty(objArray) {
    let empty = false;
    objArray.forEach(obj => {
      if (Object.entries(obj).length === 0) {
        empty = true;
      }
    });
    return empty;
  }

  // Thanks to Lewdev: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string 

  function getDomainFromUrl(url) {
    let hostname;
    
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
  }

  return { 
    formatTags, 
    createStarRating, 
    formatHours, 
    sortAZ, 
    filterGeocodeResult,
    editResult, 
    objectIsEmpty, 
    getDomainFromUrl
  };

};

}());