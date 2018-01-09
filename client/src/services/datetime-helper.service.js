(function(){
'use strict;'

angular.module('app').factory('datetimeHelperService', function() {

  const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
  
  function getNextWeek() {
    const nextWeek = [];
    
    for (let i = 1; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const day = week[currentDate.getDay()];
      const date = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      // const dateString = i === 0 ? 'Today' : `${day}, ${date} ${month}`; 
      const dateString = `${day}, ${date} ${month}`; 

      nextWeek.push(dateString);
    }
    return nextWeek;
  }

  function getTodaysDate() {
    const currentDate = new Date();
    const day = week[currentDate.getDay()];
    const date = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    return `${day}, ${date} ${month}`; 
  }

  function getHours() {
    const hours = [];
    for (let i = 2; i < 13; i++) {
      hours.push(i + ':00');
    }
    return hours;
  }

  function getDatetime(dateInput, hour, amPm) {
    if (dateInput && hour && amPm) {
      let date = '';
      if (dateInput = 'today') {
        date = getTodaysDate();
      }
      return ({date, hour, amPm});
    } else {
      return null;
    }
  }
  
  return { getNextWeek, getHours, getTodaysDate, getDatetime };
  
});

}());