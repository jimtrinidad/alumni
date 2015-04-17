angular.module('app').components.provide.factory('User', ['$resource', function($resource){
    return $resource('api/v1/user/:action:id', {
    	id: '@id',
    	action: '@action'
    }, 
    {
        query   : { 
                method  : 'GET', 
                params  : {id: ''},
                isArray : false
            },
        rights 	: {
        		method	: 'GET',
        		params 	: {action: 'rights'},
                cache   : true
        }
    });
}]);