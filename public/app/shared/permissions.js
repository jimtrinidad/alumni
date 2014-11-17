'use strict';

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
                }
            }

            removeElement();
            scope.$on('permissionsChanged', removeElement);
        }
    };
});
