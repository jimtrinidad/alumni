'use strict';

/**
* base on this tutorial
* http://nadeemkhedr.wordpress.com/2013/11/25/how-to-do-authorization-and-role-based-permissions-in-angularjs/
*/


angular.module('app').factory('permissions', function($rootScope) {
    var permissionList;
    return {
        setPermissions: function(permissions) {
            permissionList = permissions;
            $rootScope.$broadcast('permissionsChanged')
        },
        hasPermission: function(permission) {
            permission = permission;
            if (permissionList.indexOf(permission) > -1) {
	          return true;
	        }
	        return false;
        }
    };
});

/**
* Permission Directive
* usage: add attribute to element (has-permission='add')
*/
angular.module('app').directive('hasPermission', function(permissions) {
    return {
        link: function(scope, element, attrs) {

            var value = attrs.hasPermission;

            function removeElement() {
                if (!permissions.hasPermission(value)) { 
                	element.remove();
                } else {
                    element.removeClass('hidden');
                }
            }

            removeElement();
            scope.$on('permissionsChanged', removeElement);
        }
    };
});