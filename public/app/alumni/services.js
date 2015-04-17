angular.module('app').components.provide.factory('Alumni', ['$resource', function($resource){
    return $resource('api/v1/alumni/:id', { id: '@id' }, {
        query   : { 
                method  : 'GET', 
                params  : {id: ''},
                isArray : false
        },
        update	: {
        		method	: 'PUT',
        		ignoreLoadingBar	: true
        },
        save	: {
        		method	: 'POST',
        		ignoreLoadingBar	: true
        }
    });
}]);