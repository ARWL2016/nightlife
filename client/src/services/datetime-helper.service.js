/**
 *  PURPOSE: Provide datetime helper methods to the diary widget
 */

(function(){
  'use strict';

angular
  .module('app')
  .factory('datetimeHelperService', datetimeHelperService);

function datetimeHelperService() {

  const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
  
  // get all the dates for next week
  function getNextWeek() {
    const nextWeek = [];
    
    for (let i = 1; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const day = week[currentDate.getDay()];
      const date = currentDate.getDate();
      const month = months[currentDate.getMonth()];
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

  // get list of 1.00 - 12.00 
  function getHours() {
    const hours = [];
    for (let i = 2; i < 13; i++) {
      hours.push(i + ':00');
    }
    return hours;
  }

  function injectCurrentDate(datetime) {
      if (datetime.date = 'today') {
        datetime.date = getTodaysDate();
      }
      return datetime;
  }
  
  return { getNextWeek, getHours, getTodaysDate, injectCurrentDate };
};

}());