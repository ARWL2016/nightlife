'use strict';(function(){'use strict';angular.module('app').factory('categoryService',function(){var a=['accounting','airport','amusement park','aquarium','art gallery','atm','bakery','bank','bar','beauty salon','bicycle store','book store','bowling alley','bus station','cafe','campground','car dealer','car rental','car repair','car wash','casino','cemetery','church','city hall','clothing store','convenience store','courthouse','dentist','department store','doctor','electrician','electronics store','embassy','fire station','florist','funeral home','furniture store','gas station','gym','hair care','hardware store','hindu temple','home goods store','hospital','insurance agency','jewelry store','laundry','lawyer','library','liquor store','local government office','locksmith','lodging','meal delivery','meal takeaway','mosque','movie rental','movie theater','moving company','museum','night club','painter','park','parking','pet store','pharmacy','physiotherapist','plumber','police','post office','real estate agency','restaurant','roofing contractor','rv park','school','shoe store','shopping mall','spa','stadium','storage','store','subway station','synagogue','taxi stand','train station','transit station','travel agency','university','veterinary care','zoo'];return{matchCategories:function(b){return a.filter(function(a){return-1<a.indexOf(b)})},isCategoryValid:function(b){return-1<a.indexOf(b.toLowerCase())}}})})();