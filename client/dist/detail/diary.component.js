'use strict';(function(){'use strict';function a(a,b){var c=this;c.datetime={hour:'1.00',amPm:'PM',date:'today'},c.hours=a.getHours(),c.dates=a.getNextWeek(),c.added=!1,c.clicked=!1,c.diaryBtnLabel=function(){return c.added?'Added':'Add to Diary'},c.diarySpinner=!1,c.error='',c.emitDatetime=function(){if(!c.clicked){c.clicked=!0,c.error='';var d=a.injectCurrentDate(c.datetime);c.diarySpinner=!0,b.$emit('addToDiary',d)}},b.$on('eventAdded',function(){c.added=!0,c.diarySpinner=!1}),b.$on('eventNotAdded',function(){c.error='Sorry. Event could not be added'})}angular.module('app').component('diary',{templateUrl:'detail/diary.html',controllerAs:'vm',controller:a}),a.$inject=['datetimeHelperService','$scope']})();