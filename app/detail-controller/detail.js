/**
 * The detailCtrl controls the template which displays 
 * information about individual search results.
 * This page is linked to dynamically from the search 
 * results.
 */

'use strict';

const DetailCtrl = function($routeParams) {
  var vm = this;
  vm.title = 'dyn etail titled'
  vm.params1 = $routeParams.placeid;
  vm.params2 = $routeParams.photoref;

  function init() {
    console.log(vm.params1, vm.params2);
  }

  init();
}

pathFinderApp.controller('detailCtrl', ['$routeParams', DetailCtrl]);