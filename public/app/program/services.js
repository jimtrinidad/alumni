angular.module('app').components.provide.factory('Program', ['$resource', function($resource){
    return $resource('api/v1/program/:action:id', {
    	id: '@id',
    	action: '@action'
    }, 
    {
        query   : { 
                method  : 'GET', 
                params  : {id: ''},
                isArray : false
            },
        user 	: {
        		method	: 'GET',
        		params 	: {action: 'user'},
                cache   : true
        }
    });
}]);