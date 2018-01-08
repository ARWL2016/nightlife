/** 
 * This service will provide static data objects for search locations, 
 * focusing on major cities. 
 * 
 * NOT CURRENTLY IN USE
*/

(function(){
'use strict';

let cities = require('./uk-cities.json');

angular.module('app').factory('placeService', function() {

  let citiesJSON = [{"name":"Aberdeen"},{"name":"Armagh"},{"name":"Bangor"},{"name":"Bath"},{"name":"Belfast"},{"name":"Birmingham"},{"name":"Bradford"},{"name":"Brighton and Hove"},{"name":"Bristol"},{"name":"Cambridge"},{"name":"Canterbury"},{"name":"Cardiff"},{"name":"Carlisle"},{"name":"Chester"},{"name":"Chichester"},{"name":"Coventry"},{"name":"Derby"},{"name":"Dundee"},{"name":"Durham"},{"name":"Edinburgh"},{"name":"Ely"},{"name":"Exeter"},{"name":"Glasgow"},{"name":"Gloucester"},{"name":"Hereford"},{"name":"Inverness"},{"name":"Kingston upon Hull"},{"name":"Lancaster"},{"name":"Leeds"},{"name":"Leicester"},{"name":"Lichfield"},{"name":"Lincoln"},{"name":"Lisburn"},{"name":"Liverpool"},{"name":"London"},{"name":"Londonderry"},{"name":"Manchester"},{"name":"Newcastle upon Tyne"},{"name":"Newport"},{"name":"Newry"},{"name":"Norwich"},{"name":"Nottingham"},{"name":"Oxford"},{"name":"Peterborough"},{"name":"Plymouth"},{"name":"Portsmouth"},{"name":"Preston"},{"name":"Ripon"},{"name":"Salford"},{"name":"Salisbury"},{"name":"Sheffield"},{"name":"Southampton"},{"name":"St Albans"},{"name":"St Davids"},{"name":"Stirling"},{"name":"Stoke-on-Trent"},{"name":"Sunderland"},{"name":"Swansea"},{"name":"Truro"},{"name":"Wakefield"},{"name":"Wells"},{"name":"Westminster"},{"name":"Winchester"},{"name":"Wolverhampton"},{"name":"Worcester"},{"name":"York"}];
  
  function getCitiesArray() {
    let result = [];
    let cities = JSON.parse(citiesJSON);
    cities.forEach(city => {
      result.push(city.name);
    })
    return result;
  }

  return { getCitiesArray };

});

}());