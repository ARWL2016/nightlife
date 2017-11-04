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
 * TODO Must be a better way to do this
 */

'use strict';

pathFinderApp.factory('helperService', function() {

  function formatTags(results) {
   
    // if results is an object, put into an array
    const resultsArray = Array.isArray(results) ? results : [results];

    resultsArray.forEach(result => {
      let typesString = ''; 

      result.types.forEach((type, index, array) => {
        type = type.replace(/_/g, ' ');
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

  function createStarRating(num) {
    const int = Math.floor(num);
    const dec = (num - int).toFixed(1);
  
    const result = {int: [], dec: []};
    
    for (let i = 0; i < int; i++) {
      result.int.push(i);
    }
    
    if (dec > 0.2) {
      result.dec.push(1);
    }

    return result;
  }

  return { formatTags, createStarRating };

});