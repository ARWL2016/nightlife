/**
 * @function formatTags
 * @param resultsArray 
 * @return string 
 * This function takes in an array of tags and returns a 
 * string with items divided by commas and the _ removed
 */

'use strict';

pathFinderApp.factory('helperService', function() {

  function formatTags(resultsArray) {
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

  return { formatTags }

});