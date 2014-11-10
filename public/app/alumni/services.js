angular.module('app').components.provide.factory('Alumni', ['$resource', function($resource){
    return $resource('api/v1/alumni/:id', {}, {
        query   : { 
                method  : 'GET', 
                params  : {id: ''},
                isArray : false
            }
    });
}]);