"use strict";

angular.module('app').filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});

app.filter('myDate', function myDate($filter){
  return function(text, format){
    var  tempdate= new Date(text.replace(/-/g,"/"));
    if (typeof(format) == 'undefined') {
    	format = 'longDate';
    }
    return $filter('date')(tempdate, format);
  }
});