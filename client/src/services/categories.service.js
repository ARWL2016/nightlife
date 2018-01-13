/**
 * PURPOSE: populate the category input on the search page and validate user entries
 * API: only these categories are valid inputs for the Google textsearch API
 * 
 * @function matchCategorys 
 * @param category query from user search input 
 * @return the categories array filtered by the search term 
 * note that only these categories are accepted by the google API
 * 
 * @function matchOneCategory
 * @param categoryQuery a user search query for category of establishment
 * @return true of query is one of allowed categories array
 */

(function(){
  'use strict';

angular
  .module('app')
  .factory('categoryService', categoryService);
  
function categoryService() {

  const categories = ["accounting","airport","amusement park","aquarium","art gallery","atm","bakery","bank","bar","beauty salon","bicycle store","book store","bowling alley","bus station","cafe","campground","car dealer","car rental","car repair","car wash","casino","cemetery","church","city hall","clothing store","convenience store","courthouse","dentist","department store","doctor","electrician","electronics store","embassy","fire station","florist","funeral home","furniture store","gas station","gym","hair care","hardware store","hindu temple","home goods store","hospital","insurance agency","jewelry store","laundry","lawyer","library","liquor store","local government office","locksmith","lodging","meal delivery","meal takeaway","mosque","movie rental","movie theater","moving company","museum","night club","painter","park","parking","pet store","pharmacy","physiotherapist","plumber","police","post office","real estate agency","restaurant","roofing contractor","rv park","school","shoe store","shopping mall","spa","stadium","storage","store","subway station","synagogue","taxi stand","train station","transit station","travel agency","university","veterinary care","zoo"];

  function matchCategories(categoryQuery) {
    return categories.filter(category => {
      return category.indexOf(categoryQuery) > -1;
    });
  }

  function isCategoryValid(categoryQuery) {
    return categories.indexOf(categoryQuery.toLowerCase()) > -1; 
  }

  return { matchCategories, isCategoryValid };
};

}());