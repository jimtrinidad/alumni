/**
* Global Controller
* mostly function/data for the whole application
*/
angular.module('app').controller('GlobalController', ['$scope', '$location', 'permissions', function($scope, $location, permissions){
	
	$scope.path = $location.path();
	
	$scope.$on('$routeChangeStart', function(scope, next, current) {

		$scope.path = $location.path();

        var permission = next.$$route.permission;
        if (!angular.isUndefined(permission) && !permissions.hasPermission(permission)) {
            $location.path('/401');
        }

    });

    $scope.fullpage = function() {

    	var full_pages = ['/401','/404']
    	if(full_pages.indexOf($scope.path) > -1) {
    		return true;
    	}

    	return false;
    }

}]);

/**
* Header Controller for navigation menu
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