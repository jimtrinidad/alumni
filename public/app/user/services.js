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
        save    : {
                method  : 'POST',
                transformRequest    : function(data) {

                    if (data === undefined)
                      return data;

                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                      if (value instanceof FileList) {
                        if (value.length == 1) {
                          fd.append(key, value[0]);
                        } else {
                          angular.forEach(value, function(file, index) {
                            fd.append(key + '_' + index, file);
                          });
                        }
                      } else {
                        fd.append(key, value);
                      }
                    });
                    
                    return fd;
                    
                },
                headers             : { 'Content-Type': undefined },
                ignoreLoadingBar    : true
        },
        delete    : {
                method  : 'DELETE',
                ignoreLoadingBar    : true
        }
    });
}]);