/**
* Global Controller
* mostly function/data for the whole application
*/
angular.module('app').controller('GlobalController', ['$scope', '$location', 'permissions', function($scope, $location, permissions){
	
	$scope.$on('$routeChangeStart', function(scope, next, current) {
        var permission = next.$$route.permission;
        if (!angular.isUndefined(permission) && !permissions.hasPermission(permission)) {
            $location.path('/unauthorized');
        }
    });

}]);

/**
* Header Controller for navication menu
*/
angular.module('app').controller('HeaderController', ['$scope', '$location', function ($scope, $location) {

	$scope.isActive = function(route, easy) {
		if (!angular.isUndefined(easy)) {
			return ($location.path().substr(0, route.length) === route);
		} else {
			return ($location.path() === route);
		}
	}
	
}]);